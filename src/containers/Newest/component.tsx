import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Center, createListCollection } from "@chakra-ui/react"
import { Text, HStack, Flex, Spacer } from "@chakra-ui/react";

import { PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot } from "@/components/Chakra/pagination"
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/Chakra/select"
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb"

import { History } from "@/store/pageLanding";
import { STATUS as STATUS_NEWEST } from "@/store/containerNewest";
import { STATUS as STATUS_DETAILS } from "@/store/containerDetails";
import { Item as NewestItem } from "@/services/newest.types";
import { Item as DetailsItem } from "@/services/details.types";
import withRouter, { WithRouterProps } from "@/hocs/withRouter";
import Card from "@/components/Card"

gsap.registerPlugin(ScrollTrigger);

export interface Props {
    state: {
        landing: {
            history: History[];
        },
        newest: {
            occurrences: Array<NewestItem>;
            page: number;
            limit: number;
            total: number;
            totalPages: number;
            types: string[];
            status: STATUS_NEWEST;
            error: any;
        },
        details: {
            occurrence: DetailsItem | null;
            status: STATUS_DETAILS;
            error: any;
        },
    };
    actions: {
        landing: {
            clearHistory: Function;
        },
        newest: {
            doGetNewest: Function;
            setDialogOpenId: Function;
        },
        details: {
            doGetDetails: Function;
        }
    };
}

const Component: React.FC<Props & WithRouterProps> = ({ router, state, actions, }) => {

    const cardsRef = useRef<HTMLDivElement[]>([]);

    const pages = createListCollection({
        items: [
            { label: "5", value: "5" },
            { label: "10", value: "10" },
            { label: "20", value: "20" },
            { label: "50", value: "50" },
            { label: "100", value: "100" },
            { label: "200", value: "200" },
            { label: "500", value: "500" },
            { label: "1000", value: "1000" },
        ],
    })

    function onPageChange(details: any) {
        const { page, pageSize } = details as { page: number; pageSize: number };
        actions.newest.doGetNewest({ page, limit: pageSize });
    }

    function onSizeChange(args: any) {
        const { value: pageSize } = args as { items: typeof Proxy[]; value: string[] };
        actions.newest.doGetNewest({ page: state.newest.page, limit: parseFloat(pageSize[0]) });
    }

    function onGoToDetails(id: string) {
        router.navigate(`/details/${id}`)
    }

    {/** Navigation History Component */ }
    const NavigationHistory: React.FC = () => state.landing.history.length != 0 && <BreadcrumbRoot size={"lg"}>
        {state.landing.history.map(history =>
            !history.current
                ? <BreadcrumbLink key={crypto.randomUUID()} href="#">{history.label}</BreadcrumbLink>
                : <BreadcrumbCurrentLink key={crypto.randomUUID()}>{history.label}</BreadcrumbCurrentLink>
        )}
    </BreadcrumbRoot>

    {/** Pagination */ }
    const Pagination: React.FC = () => <>
        <PaginationRoot width={'fit-content'} count={state.newest.total} pageSize={state.newest.limit} defaultPage={state.newest.page} onPageChange={onPageChange}>
            <HStack gap="4">
                <PaginationPrevTrigger />
                <PaginationPageText format="long" flex="1" />
                {/* <PaginationItems /> */}
                <PaginationNextTrigger />
            </HStack>
        </PaginationRoot>

        <SelectRoot size={'sm'} collection={pages} width={'8rem'} defaultValue={[`${state.newest.limit}`]} onValueChange={onSizeChange}>
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
        {state.newest.occurrences.map((occurrence, index) => (
            <div
                key={crypto.randomUUID()}
                ref={(el) => (cardsRef.current[index] = el!)} // Salva il ref della card
            >
                <Card
                    id={occurrence.id}
                    thumbnail={occurrence.image.thumbnail}
                    title={occurrence.title}
                    type={occurrence.type}
                    yearStart={occurrence.year_start}
                    season={occurrence.season}
                    goToDetails={onGoToDetails}
                />
            </div>
        ))}
    </Flex>

    useEffect(() => {
        actions.newest.doGetNewest({ page: state.newest.page, limit: state.newest.limit });
    }, []);

    useEffect(() => {

        // Animazione GSAP per le card
        cardsRef.current.forEach((card) => {
            const fromVars = {
                opacity: 0, // Inizia trasparente
                y: 100,     // Parte 100px sotto
            };

            const toVars = {
                opacity: 1, // Diventa visibile
                y: 0,       // Torna alla posizione originale
                duration: 0.8, // Durata dell'animazione
                ease: "bounce.out", // Effetto rimbalzo
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%", // Inizia quando il top della card raggiunge l'85% del viewport
                    toggleActions: "play none none none", // L'animazione si riproduce solo in avanti
                },
            };

            return gsap.fromTo(card, fromVars, toVars);
        });

    }, [state.newest.occurrences]);

    return <>
        {state.newest.status === STATUS_NEWEST.LOADING
            ? <Text>Loading...</Text>
            : <>

                {/** ActionBar */}
                <Flex wrap="wrap" gap="4" width={'100%'} justifyContent={"end"}>
                    {/** Navigation History */}
                    <NavigationHistory />
                    {/** Spacer */}
                    <Spacer />
                    {/** Pagination */}
                    <Pagination />
                </Flex>

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