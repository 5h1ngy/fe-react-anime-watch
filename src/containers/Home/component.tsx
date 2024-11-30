import { useEffect } from "react";

import { Center, createListCollection } from "@chakra-ui/react"
import { Text, HStack, Flex, Spacer } from "@chakra-ui/react";

import { PaginationItems, PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot } from "@/components/Chakra/pagination"
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "@/components/Chakra/select"
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb"

import { History } from "@/store/pageLanding";
import { STATUS } from "@/store/containerHome";
import { Item } from "@/services/newest.types";

import Card from "@/components/Card"

export interface Props {
    state: {
        occurrences: Array<Item>;
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        types: string[];
        status: STATUS;
        error: any;
        history: History[];
    };
    actions: {
        doGetNewest: Function;
        updateHistory: Function;
        clearHistory: Function;
    };
}

const Component: React.FC<Props> = ({ state, actions, }) => {

    const pages = createListCollection({
        items: [
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "50", value: "50" },
            { label: "100", value: "100" },
            { label: "200", value: "200" },
        ],
    })

    function onPageChange(details: any) {
        const { page, pageSize } = details as { page: number; pageSize: number };
        actions.doGetNewest({ page, limit: pageSize });
    }

    function onSizeChange(args) {
        const { value: pageSize } = args as { items: typeof Proxy[]; value: string[] };
        actions.doGetNewest({ page: state.page, limit: parseFloat(pageSize[0]) });
    }

    {/** Navigation History Component */ }
    const NavigationHistory: React.FC = () => state.history.length != 0 && <BreadcrumbRoot>
        {state.history.map(history =>
            !history.current
                ? <BreadcrumbLink key={crypto.randomUUID()} href="#">{history.label}</BreadcrumbLink>
                : <BreadcrumbCurrentLink key={crypto.randomUUID()}>{history.label}</BreadcrumbCurrentLink>
        )}
    </BreadcrumbRoot>

    {/** Pagination */ }
    const Pagination: React.FC = () => <>
        <PaginationRoot width={'fit-content'} count={state.total} pageSize={state.limit} defaultPage={state.page} onPageChange={onPageChange}>
            <HStack gap="4">
                <PaginationPrevTrigger />
                <PaginationPageText format="long" flex="1" />
                {/* <PaginationItems /> */}
                <PaginationNextTrigger />
            </HStack>
        </PaginationRoot>

        <SelectRoot size={'sm'} collection={pages} width={'8rem'} defaultValue={[`${state.limit}`]} onValueChange={onSizeChange}>
            <SelectTrigger>
                <SelectValueText placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
                {pages.items.map((item) => <SelectItem item={item} key={item.value} >
                    {item.label}
                </SelectItem>)}
            </SelectContent>
        </SelectRoot>
    </>

    const Cards: React.FC = () => <Flex wrap={'wrap'} gap='2rem' align="stretch" justify={"center"}>
        {state.occurrences.map(occurrence => <Card key={crypto.randomUUID()}
            thumbnail={occurrence.image.thumbnail}
            title={occurrence.title}
            type={occurrence.type}
        />)}
    </Flex>

    useEffect(() => {
        actions.doGetNewest({ page: state.page, limit: state.limit });
    }, []);

    return <>
        {state.status === STATUS.LOADING
            ? <Text>Loading...</Text>
            : <>

                {/** ActionBar */}
                <HStack gap="4" width={'100%'} justifyContent={"end"}>
                    {/** Navigation History */}
                    <NavigationHistory />
                    {/** Spacer */}
                    <Spacer />
                    {/** Pagination */}
                    <Pagination />
                </HStack>

                {/* Cards */}
                <Cards />

                {/** Pagination */}
                <Center>
                    <Pagination />
                </Center>

            </>
        }
    </>
}

export default Component;