import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import DOMPurify from 'dompurify';
import { VStack, HStack, Flex, Center, Spacer, Box } from "@chakra-ui/react";
import { Card, Image, Text, Badge } from "@chakra-ui/react"

import { History } from "@/store/pageLanding";
import { STATUS } from "@/store/containerDetails";
import { Item } from "@/services/details.types";
import withRouter, { WithRouterProps } from "@/hocs/withRouter";
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb";
import { Button } from "@/components/Chakra/button"
import _ from "lodash";


const Demo = (props: Item) => {
    const sanitizedHtml = DOMPurify.sanitize(props.description);

    return (
        <Card.Root maxW={{ base: '250px', xl: '250px', lg: '250px', md: '250px', sm: '250px' }} overflow="hidden">
            <Image
                src={props.image.thumbnail}
                alt="Green double couch with wooden legs"
            />
            <Card.Body gap="2">
                <Card.Title>{props.title}</Card.Title>
                <Card.Description>
                    {props.type}
                    {/* <Flex wrap={"wrap"} gap={'0.3rem'}>
                        {props.tags.map(tag => <Badge>{tag.label}</Badge>)}
                    </Flex>
                    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} /> */}
                </Card.Description>
            </Card.Body>
            <Card.Footer gap="2">
                <Button variant="solid">Buy now</Button>
                <Button variant="ghost">Add to cart</Button>
            </Card.Footer>
        </Card.Root>
    )
}

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

function getRandomColor(): 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink' | 'accent' {
    const colors: Array<'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink' | 'accent'> = [
        'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink', 'accent'
    ];
    return _.sample(colors)!;
}


const Component: React.FC<Props & WithRouterProps> = ({ router, state, actions, }) => {
    const occurrence = useLoaderData(); // Ricevi i dati restituiti dal loader

    {/** Navigation History Component */ }
    const NavigationHistory: React.FC = () => state.history.length != 0 && <BreadcrumbRoot>
        {state.history.map(history =>
            !history.current
                ? <BreadcrumbLink key={crypto.randomUUID()} href="#">{history.label}</BreadcrumbLink>
                : <BreadcrumbCurrentLink key={crypto.randomUUID()}>{history.label}</BreadcrumbCurrentLink>
        )}
    </BreadcrumbRoot>

    return <>

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

            <Flex direction={"column"} width={'50%'} gap={'0.4rem'}>

                <Flex direction={"row"} gap={"1rem"}>
                    <Text textStyle="md">{occurrence!.year_start} {occurrence!.season}</Text>
                    <Text textStyle="md">{occurrence!.type}, episodes: {occurrence!.episodes}</Text>
                </Flex>

                <Text textStyle="3xl">
                    {occurrence!.title}
                </Text>

                {occurrence.tags && <Flex wrap={"wrap"} gap={'0.3rem'}>
                    {occurrence.tags.map((tag: { label: string }) => <Badge colorPalette={getRandomColor()}>{tag.label}</Badge>)}
                </Flex>}

                <Box borderWidth="1px" borderRadius={'10px'} padding={'1rem'} backgroundColor={"white"} _dark={{ backgroundColor: "black" }}>
                    {occurrence.description && <div dangerouslySetInnerHTML={{ __html: occurrence?.description || '' }} />}
                </Box>
            </Flex>

        </Flex>

    </>
}

export default withRouter(Component);
