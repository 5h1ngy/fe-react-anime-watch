import { VStack, Text, HStack, Flex, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { STATUS } from "@/store/home";
import { Item } from "@/services/newest.types";
import { Grid, GridItem } from "@chakra-ui/react";

import { Badge, Box, Card, Image } from "@chakra-ui/react"
import { Button } from "@/components/Chakra/button"

const Demo = (props: Item) => {
    return (
        <Card.Root maxW={{ base: '250px', xl: '240px', lg: '250px', md: '250px', sm: '250px' }} overflow="hidden">
            <Image
                src={props.image.thumbnail}
                alt="Green double couch with wooden legs"
            />
            <Card.Body gap="2">
                <Card.Title>{props.title}</Card.Title>
                <Card.Description>
                    {props.type}
                    <Flex wrap={"wrap"} gap={'0.3rem'}>
                        {props.tags.map(tag => <Badge>{tag.label}</Badge>)}
                    </Flex>
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
        occurrences: Item[];
        status: STATUS;
    };
    actions: { doGetNewest: () => void };
}

export default function MosaicGrid(props: Props) {
    const { state, actions } = props;

    useEffect(() => {
        actions.doGetNewest();
    }, []);

    return <VStack height="100vh" width="100%" align="center" justify="start">
        {state.status === STATUS.LOADING
            ? <Text>Loading...</Text>
            : <Flex wrap={'wrap'} gap='2rem' align="stretch" justify={"center"}>
                {state.occurrences.map(occurrence => <Demo {...occurrence} />)}
            </Flex>
        }
    </VStack>
}
