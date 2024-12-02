import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Center, createListCollection } from "@chakra-ui/react"
import { Text, HStack, Flex, Spacer } from "@chakra-ui/react";

import { PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot } from "@/components/Chakra/pagination"
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/Chakra/select"
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb"

import { History } from "@/store/pageLanding";
import { STATUS } from "@/store/containerHome";
import { Item } from "@/services/newest.types";
import withRouter, { WithRouterProps } from "@/hocs/withRouter";

import Card from "@/components/Card"

gsap.registerPlugin(ScrollTrigger);

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
        clearHistory: Function;
    };
}

const Component: React.FC<Props & WithRouterProps> = ({ router, state, actions, }) => {

    const cardsRef = useRef<HTMLDivElement[]>([]);

    const pages = createListCollection({
        items: [
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "50", value: "50" },
            { label: "100", value: "100" },
            { label: "200", value: "200" },
            { label: "500", value: "500" },
            { label: "1000", value: "1000" },
        ],
    })

    function onPageChange(details: any) {
        const { page, pageSize } = details as { page: number; pageSize: number };
        actions.doGetNewest({ page, limit: pageSize });
    }

    function onSizeChange(args: any) {
        const { value: pageSize } = args as { items: typeof Proxy[]; value: string[] };
        actions.doGetNewest({ page: state.page, limit: parseFloat(pageSize[0]) });
    }

    function onGoToDetails(id: string) {
        router.navigate(`/details/${id}`)
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
        {state.occurrences.map((occurrence, index) => (
            <div
                key={crypto.randomUUID()}
                ref={(el) => (cardsRef.current[index] = el!)} // Salva il ref della card
            >
                <Card
                    id={occurrence.id}
                    thumbnail={occurrence.image.thumbnail}
                    title={occurrence.title}
                    type={occurrence.type}
                    goToDetails={onGoToDetails}
                />
            </div>
        ))}
    </Flex>

    useEffect(() => {
        actions.doGetNewest({ page: state.page, limit: state.limit });
    }, []);

    useEffect(() => {
        // Animazione GSAP per le card
        cardsRef.current.forEach(card => gsap.fromTo(
            card,
            {
                opacity: 0,
                y: 50, // Parte 50px sotto
            },
            {
                opacity: 1,
                y: 0, // Torna alla posizione originale
                duration: 0.4,
                delay: 0.9, // Effetto "staggered"
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // Inizia quando il top è all'80% del viewport
                    toggleActions: "play none none none",
                },
            }
        ));
    }, [state.occurrences]);

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

export default withRouter(Component);