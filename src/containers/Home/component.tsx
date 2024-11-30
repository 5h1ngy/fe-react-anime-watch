import { VStack, Text, HStack, Flex, Center, Spacer } from "@chakra-ui/react";
import { useEffect } from "react";
import { STATUS } from "@/store/home";
import { Item } from "@/services/newest.types";
import { Grid, GridItem } from "@chakra-ui/react";

import DOMPurify from 'dompurify';

import { Badge, Box, Card, Image } from "@chakra-ui/react"
import { Button } from "@/components/Chakra/button"
import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPageText,
    PaginationPrevTrigger,
    PaginationRoot,
} from "@/components/Chakra/pagination"

import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/Chakra/select"

import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb"
import { For, Stack, createListCollection } from "@chakra-ui/react"

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
        occurrences: Item[];
        types: string[];
        status: STATUS;
    };
    actions: {
        doGetNewest: Function;
        setNavItems: Function;
    };
}

export default function MosaicGrid(props: Props) {
    const { state, actions } = props;

    const navigationHistory = [
        { label: 'Test-1', current: false },
        { label: 'Test-2', current: false },
        { label: 'Test-3', current: false },
        { label: 'Test-4', current: true },
    ]

    const frameworks = createListCollection({
        items: [
            { label: "React.js", value: "react" },
            { label: "Vue.js", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
        ],
    })
    useEffect(() => {
        actions.doGetNewest();
    }, []);

    return <>
        {state.status === STATUS.LOADING
            ? <Text>Loading...</Text>
            : <>
                <HStack gap="4" width={'100%'} justifyContent={"end"}>

                    {/** Navigation History */}
                    {navigationHistory.length != 0
                        ? <BreadcrumbRoot>
                            {navigationHistory.map(history =>
                                !history.current
                                    ? <BreadcrumbLink key={crypto.randomUUID()} href="#">{history.label}</BreadcrumbLink>
                                    : <BreadcrumbCurrentLink key={crypto.randomUUID()}>{history.label}</BreadcrumbCurrentLink>
                            )}
                        </BreadcrumbRoot>
                        : undefined}

                    <Spacer />
                    <PaginationRoot count={20} pageSize={2} defaultPage={1}>
                        <HStack gap="4">
                            <PaginationPrevTrigger />
                            <PaginationPageText />
                            <PaginationNextTrigger />
                        </HStack>
                    </PaginationRoot>

                    <SelectRoot size={'sm'} collection={frameworks} width={'8rem'}>
                        <SelectTrigger>
                            <SelectValueText placeholder="Select movie" />
                        </SelectTrigger>
                        <SelectContent>
                            {frameworks.items.map((movie) => (
                                <SelectItem item={movie} key={movie.value}>
                                    {movie.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </SelectRoot>
                </HStack>
                <Flex wrap={'wrap'} gap='2rem' align="stretch" justify={"center"}>
                    {state.occurrences.map(occurrence => <Demo {...occurrence} />)}
                </Flex>
            </>
        }
    </>
}
