#!/bin/bash

# AWS CloudFront Distribution ID
DISTRIBUTION_ID="YOUR_DISTRIBUTION_ID"

# Invalidation path (cache all files with "/*")
INVALIDATION_PATH="/*"

# Create CloudFront invalidation request
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths $INVALIDATION_PATH

# Check if invalidation was successful
if [ $? -eq 0 ]; then
    echo "CloudFront invalidation request was successfully created!"
else
    echo "Error occurred during CloudFront invalidation!"
    exit 1
fi
