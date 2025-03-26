provider "aws" {
  region = "ap-southeast-1"
}

resource "aws_s3_bucket" "image_gallery_nextjs" {
  bucket = "image-gallery-nextjs-bucket"
  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "image_gallery_nextjs" {
  bucket = aws_s3_bucket.image_gallery_nextjs.id
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "image_gallery_nextjs_policy" {
  bucket = aws_s3_bucket.image_gallery_nextjs.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = {
          "Service": "cloudfront.amazonaws.com"
        },
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.image_gallery_nextjs.arn}/*",
        Condition = {
          "StringEquals" = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn
          }
        }
      }
    ]
  })
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "s3-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name              = aws_s3_bucket.image_gallery_nextjs.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
    origin_id                = "S3-${aws_s3_bucket.image_gallery_nextjs.id}"
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.image_gallery_nextjs.id}"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      // Location: Vietnam, Japan, USA, Singapore, Australia, Korea, China, Thailand
      locations        = ["VN", "JP", "US", "SG", "AU", "KR", "CN", "TH"]
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "s3_bucket_name" {
  value = aws_s3_bucket.image_gallery_nextjs.id
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.cdn.domain_name
}
