"use client";
import { Text, Timeline } from "@chakra-ui/react";
import { LuCheck, LuPackage, LuShip } from "react-icons/lu";

export const TimelineComponent = ({ onMenuItemClick }: { onMenuItemClick: (menu: string) => void }) => {
    return (
        <Timeline.Root px="15px" mt="20px" color="black" alignItems="center">
            <Timeline.Item>
                <Timeline.Connector>
                    <Timeline.Separator borderColor="#1B5E20" />
                    <Timeline.Indicator outline="2px solid #1B5E20" color="black" bg="white">
                        <LuShip color="#1B5E20" />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick("maison-10012024-wedding")}
                        cursor="pointer"
                        fontWeight="bold"
                        color="#1B5E20"
                        textDecoration="underline"
                        textDecorationColor="#1B5E20"
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
                    <Timeline.Separator borderColor="#1B5E20" />
                    <Timeline.Indicator outline="2px solid #1B5E20" color="black" bg="white">
                        <LuCheck color="#1B5E20" />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick("groom-07012024-wedding")}
                        cursor="pointer"
                        fontWeight="bold"
                        color="#1B5E20"
                        textDecoration="underline"
                        textDecorationColor="#1B5E20"
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
                    <Timeline.Separator borderColor="#1B5E20" />
                    <Timeline.Indicator outline="2px solid #1B5E20" color="black" bg="white">
                        <LuPackage color="#1B5E20" />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick("bride-07012024-wedding")}
                        cursor="pointer"
                        fontWeight="bold"
                        color="#1B5E20"
                        textDecoration="underline"
                        textDecorationColor="#1B5E20"
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
                    <Timeline.Separator borderColor="#1B5E20" />
                    <Timeline.Indicator outline="2px solid #1B5E20" color="black" bg="white">
                        <LuPackage color="#1B5E20" />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick("06012024-wedding")}
                        cursor="pointer"
                        fontWeight="bold"
                        color="#1B5E20"
                        textDecoration="underline"
                        textDecorationColor="#1B5E20"
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
                    <Timeline.Separator borderColor="#1B5E20" />
                    <Timeline.Indicator outline="2px solid #1B5E20" color="black" bg="white">
                        <LuPackage color="#1B5E20" />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick("engagement-ceremony-wedding")}
                        cursor="pointer"
                        fontWeight="bold"
                        color="#1B5E20"
                        textDecoration="underline"
                        textDecorationColor="#1B5E20"
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
                    <Timeline.Separator borderColor="#1B5E20" />
                    <Timeline.Indicator outline="2px solid #1B5E20" color="black" bg="white">
                        <LuPackage color="#1B5E20" />
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title
                        onClick={() => onMenuItemClick("pre-wedding")}
                        cursor="pointer"
                        fontWeight="bold"
                        color="#1B5E20"
                        textDecoration="underline"
                        textDecorationColor="#1B5E20"
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
