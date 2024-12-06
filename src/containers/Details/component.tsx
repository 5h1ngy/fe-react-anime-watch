import _ from "lodash";
import { useLoaderData } from "react-router-dom";
import DOMPurify from 'dompurify';
import { VStack, HStack, Flex, Center, Spacer, Box } from "@chakra-ui/react";
import { Card, Image, Text, Badge } from "@chakra-ui/react"
import { Separator } from "@chakra-ui/react"

import getRandomColor from "@/utils/getRandomColor"
import { History } from "@/store/pageLanding";
import { STATUS } from "@/store/containerDetails";
import { Item } from "@/services/details.types";
import withRouter, { WithRouterProps } from "@/hocs/withRouter";
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb";

export interface Props {
    state: {
        occurrence: Item | null;
        status: STATUS;
        history: History[];
    };
    actions: {
        setHistory: Function;
    };
}

const Component: React.FC<Props & WithRouterProps> = ({ state, actions, }) => {
    const occurrence = useLoaderData()

    {/** Navigation History Component */ }
    const NavigationHistory: React.FC = () => state.history.length != 0 && <BreadcrumbRoot>
        {state.history.map(history =>
            !history.current
                ? <BreadcrumbLink key={crypto.randomUUID()} href="#">{history.label}</BreadcrumbLink>
                : <BreadcrumbCurrentLink key={crypto.randomUUID()}>{history.label}</BreadcrumbCurrentLink>
        )}
    </BreadcrumbRoot>

    return <>

        {state.status === STATUS.LOADING
            ? "LOADING..."
            : <Flex direction={"column"} gapY={'2rem'}>
                <NavigationHistory />

                <Flex wrap={"wrap"} gap={'2rem'} justifyContent={"center"}>

                    <Flex direction={"column"} width={'fit-content'} gap={'1rem'}>
                        <Image
                            width={'300px'}
                            borderWidth="1px" borderRadius={'10px'}
                            src={occurrence.image.thumbnail}
                            alt="Green double couch with wooden legs"
                        />
                    </Flex>

                    <Flex direction={"column"} width={{ base: "none", sm: "none", md: "50%", lg: '50%', xl: '50%', "2xl": '50%' }} gap={'0.4rem'}>

                        <Flex direction={"row"} gap={"1rem"}>
                            <Text textStyle="md">{occurrence!.season} {occurrence!.year_start}</Text>
                            <Text textStyle="md">{occurrence!.type}, episodes: {occurrence!.episodes}</Text>
                        </Flex>

                        <Separator />

                        <Text textStyle="3xl">
                            {occurrence!.title}
                        </Text>

                        {occurrence.tags && <Flex wrap={"wrap"} gap={'0.3rem'}>
                            {occurrence.tags.map((tag: { label: string }) =>
                                <Badge colorPalette={getRandomColor()}>{tag.label}</Badge>
                            )}
                        </Flex>}

                        {occurrence.description && <Box
                            borderWidth="1px" borderRadius={'10px'} padding={'1rem'}
                            backgroundColor={"white"} _dark={{ backgroundColor: "black" }}
                        >
                            {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(occurrence?.description) || '' }} /> */}
                            <div dangerouslySetInnerHTML={{ __html: occurrence?.description || '' }} />
                        </Box>}
                    </Flex>

                </Flex>
            </Flex>
        }

    </>
}

export default withRouter(Component);
