"use client";
import { Text, Timeline } from "@chakra-ui/react";
import { LuCheck, LuPackage, LuShip } from "react-icons/lu";
import { bride, departure, engagement, groom, maison, preWedding } from "@/constants";
import { green900 } from "@/constants/colors";

export const TimelineComponent = ({ onMenuItemClick }: { onMenuItemClick: (menu: string) => void }) => {
    return (
        <Timeline.Root px="15px" mt="20px" color="black" alignItems="center">
            <Timeline.Item>
                <Timeline.Connector>
                    <Timeline.Separator borderColor={green900} />
                    <Timeline.Indicator outline="2px solid" outlineColor={green900} color="black" bg="white">
                        <LuShip color={green900} />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick(maison)}
                        cursor="pointer"
                        fontWeight="bold"
                        color={green900}
                        textDecoration="underline"
                        textDecorationColor={green900}
                    >
                        Wedding at Maison De Charme
                    </Timeline.Title>
                    <Timeline.Description fontWeight="bold">10th Jan 2024</Timeline.Description>
                    <Text textStyle="sm">
                        We shipped your product via <strong>FedEx</strong> and it should arrive within 3-5 business
                        days.
                    </Text>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
                <Timeline.Connector>
                    <Timeline.Separator borderColor={green900} />
                    <Timeline.Indicator outline="2px solid" outlineColor={green900} color="black" bg="white">
                        <LuCheck color={green900} />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick(groom)}
                        cursor="pointer"
                        fontWeight="bold"
                        color={green900}
                        textDecoration="underline"
                        textDecorationColor={green900}
                    >
                        Wedding ceremony at the groom's house
                    </Timeline.Title>
                    <Timeline.Description fontWeight="bold">7th Jan 2024</Timeline.Description>
                    <Text textStyle="sm">
                        We shipped your product via <strong>FedEx</strong> and it should arrive within 3-5 business
                        days.
                    </Text>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
                <Timeline.Connector>
                    <Timeline.Separator borderColor={green900} />
                    <Timeline.Indicator outline="2px solid" outlineColor={green900} color="black" bg="white">
                        <LuPackage color={green900} />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick(bride)}
                        cursor="pointer"
                        fontWeight="bold"
                        color={green900}
                        textDecoration="underline"
                        textDecorationColor={green900}
                    >
                        Wedding ceremony at the bride's house
                    </Timeline.Title>
                    <Timeline.Description fontWeight="bold">7th Jan 2024</Timeline.Description>
                    <Text textStyle="sm">
                        We shipped your product via <strong>FedEx</strong> and it should arrive within 3-5 business
                        days.
                    </Text>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
                <Timeline.Connector>
                    <Timeline.Separator borderColor={green900} />
                    <Timeline.Indicator outline="2px solid" outlineColor={green900} color="black" bg="white">
                        <LuPackage color={green900} />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick(departure)}
                        cursor="pointer"
                        fontWeight="bold"
                        color={green900}
                        textDecoration="underline"
                        textDecorationColor={green900}
                    >
                        Bride's departure ceremony
                    </Timeline.Title>
                    <Timeline.Description fontWeight="bold">6th Jan 2024</Timeline.Description>
                    <Text textStyle="sm">
                        We shipped your product via <strong>FedEx</strong> and it should arrive within 3-5 business
                        days.
                    </Text>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
                <Timeline.Connector>
                    <Timeline.Separator borderColor={green900} />
                    <Timeline.Indicator outline="2px solid" outlineColor={green900} color="black" bg="white">
                        <LuPackage color={green900} />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick(engagement)}
                        cursor="pointer"
                        fontWeight="bold"
                        color={green900}
                        textDecoration="underline"
                        textDecorationColor={green900}
                    >
                        Engagement ceremony wedding
                    </Timeline.Title>
                    <Timeline.Description fontWeight="bold">23rd Jul 2023</Timeline.Description>
                    <Text textStyle="sm">
                        We shipped your product via <strong>FedEx</strong> and it should arrive within 3-5 business
                        days.
                    </Text>
                </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
                <Timeline.Connector>
                    <Timeline.Separator borderColor={green900} />
                    <Timeline.Indicator outline="2px solid" outlineColor={green900} color="black" bg="white">
                        <LuPackage color={green900} />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick(preWedding)}
                        cursor="pointer"
                        fontWeight="bold"
                        color={green900}
                        textDecoration="underline"
                        textDecorationColor={green900}
                    >
                        Pre-wedding
                    </Timeline.Title>
                    <Timeline.Description fontWeight="bold">22nd Apr 2023</Timeline.Description>
                    <Text textStyle="sm">
                        We shipped your product via <strong>FedEx</strong> and it should arrive within 3-5 business
                        days.
                    </Text>
                </Timeline.Content>
            </Timeline.Item>
        </Timeline.Root>
    );
};
