"use client";
import { Text, Timeline } from "@chakra-ui/react";
import { LuCheck, LuPackage, LuShip } from "react-icons/lu";
import { bride, departure, engagement, groom, maison, preWedding } from "@/constants";
import { green900 } from "@/constants/colors";
import { JSX } from "react";

const TimelineEvent = ({
    onMenuItemClick,
    eventName,
    eventDate,
    icon,
    menuItem,
}: {
    onMenuItemClick: (menu: string) => void;
    eventName: string;
    eventDate: string;
    icon: JSX.Element;
    menuItem: string;
}) => (
    <Timeline.Item>
        <Timeline.Connector>
            <Timeline.Separator borderColor={green900} />
            <Timeline.Indicator outline="2px solid" outlineColor={green900} color="black" bg="white">
                {icon}
            </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
            <Timeline.Title
                onClick={() => onMenuItemClick(menuItem)}
                cursor="pointer"
                fontWeight="bold"
                color={green900}
                textDecoration="underline"
                textDecorationColor={green900}
            >
                {eventName}
            </Timeline.Title>
            <Timeline.Description fontWeight="bold">{eventDate}</Timeline.Description>
            <Text textStyle="sm">
                We shipped your product via <strong>FedEx</strong> and it should arrive within 3-5 business days.
            </Text>
        </Timeline.Content>
    </Timeline.Item>
);

export const TimelineComponent = ({ onMenuItemClick }: { onMenuItemClick: (menu: string) => void }) => {
    return (
        <Timeline.Root px="15px" mt="20px" color="black" alignItems="center">
            <TimelineEvent
                onMenuItemClick={onMenuItemClick}
                eventName="Wedding at Maison De Charme"
                eventDate="10th Jan 2024"
                icon={<LuShip color={green900} />}
                menuItem={maison}
            />
            <TimelineEvent
                onMenuItemClick={onMenuItemClick}
                eventName="Wedding ceremony at the groom's house"
                eventDate="7th Jan 2024"
                icon={<LuCheck color={green900} />}
                menuItem={groom}
            />
            <TimelineEvent
                onMenuItemClick={onMenuItemClick}
                eventName="Wedding ceremony at the bride's house"
                eventDate="7th Jan 2024"
                icon={<LuPackage color={green900} />}
                menuItem={bride}
            />
            <TimelineEvent
                onMenuItemClick={onMenuItemClick}
                eventName="Bride's departure ceremony"
                eventDate="6th Jan 2024"
                icon={<LuPackage color={green900} />}
                menuItem={departure}
            />
            <TimelineEvent
                onMenuItemClick={onMenuItemClick}
                eventName="Engagement ceremony wedding"
                eventDate="23rd Jul 2023"
                icon={<LuPackage color={green900} />}
                menuItem={engagement}
            />
            <TimelineEvent
                onMenuItemClick={onMenuItemClick}
                eventName="Pre-wedding"
                eventDate="22nd Apr 2023"
                icon={<LuPackage color={green900} />}
                menuItem={preWedding}
            />
        </Timeline.Root>
    );
};
