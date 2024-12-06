import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Center, createListCollection } from "@chakra-ui/react"
import { Text, HStack, Flex, Spacer } from "@chakra-ui/react";

import { PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot } from "@/components/Chakra/pagination"
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/Chakra/select"
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb"
import { toaster } from "@/components/Chakra/toaster"

import { STATUS as STATUS_NEWEST } from "@/store/containerNewest";
import { STATUS_REFERENCE } from "@/store/containerMyList";
import withRouter, { WithRouterProps } from "@/hocs/withRouter";
import Card from "@/components/Card"
import { ComponentProps } from "./component.types";

gsap.registerPlugin(ScrollTrigger);

const Component: React.FC<ComponentProps & WithRouterProps> = ({ router, state, actions, }) => {

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
        actions.containerNewest.doGetNewest({ page, limit: pageSize });
    }

    function onSizeChange(args: any) {
        const { value: pageSize } = args as { items: typeof Proxy[]; value: string[] };
        actions.containerNewest.doGetNewest({ page: state.containerNewest.page, limit: parseFloat(pageSize[0]) });
    }

    function onGoToDetails(id: string) {
        router.navigate(`/details/${id}`)
    }

    function addToFavorites(title: string, id: string) {
        if (!state.containerMyList.references.find(reference => reference.id === id)) {

            toaster.create({
                title: `${title} Add to favorites `,
                type: 'success',
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })

            actions.containerMyList.addReference({
                status: STATUS_REFERENCE.TO_WATCH,
                id,
            })
        } else {
            
            
            toaster.create({
                title: `${title} Already inside your list `,
                type: 'error',
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })
        }
    }

    {/** Navigation History Component */ }
    const NavigationHistory: React.FC = () => state.pageLanding.history.length != 0 && <BreadcrumbRoot size={"lg"}>
        {state.pageLanding.history.map(history =>
            !history.current
                ? <BreadcrumbLink key={crypto.randomUUID()} href="#">{history.label}</BreadcrumbLink>
                : <BreadcrumbCurrentLink key={crypto.randomUUID()}>{history.label}</BreadcrumbCurrentLink>
        )}
    </BreadcrumbRoot>

    {/** Pagination */ }
    const Pagination: React.FC = () => <>
        <PaginationRoot width={'fit-content'}
            count={state.containerNewest.total}
            pageSize={state.containerNewest.limit}
            defaultPage={state.containerNewest.page}
            onPageChange={onPageChange}
        >
            <HStack gap="4">
                <PaginationPrevTrigger />
                <PaginationPageText format="long" flex="1" />
                {/* <PaginationItems /> */}
                <PaginationNextTrigger />
            </HStack>
        </PaginationRoot>

        <SelectRoot size={'sm'} collection={pages} width={'8rem'}
            defaultValue={[`${state.containerNewest.limit}`]}
            onValueChange={onSizeChange}
        >
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

    const Cards: React.FC = () => <Flex wrap={'wrap'} gap='2rem' align="stretch" justify={"start"}>
        {state.containerNewest.occurrences.map((occurrence, index) => (
            <div key={crypto.randomUUID()} ref={(el) => (cardsRef.current[index] = el!)}>
                <Card
                    id={occurrence.id}
                    thumbnail={occurrence.image.thumbnail}
                    title={occurrence.title}
                    type={occurrence.type}
                    yearStart={occurrence.year_start}
                    season={occurrence.season}
                    goToDetails={onGoToDetails}
                    addToFavorites={addToFavorites}
                />
            </div>
        ))}
    </Flex>

    useEffect(() => {
        actions.containerNewest.doGetNewest({
            page: state.containerNewest.page,
            limit: state.containerNewest.limit
        });
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

    }, [state.containerNewest.occurrences]);

    return <>
        {state.containerNewest.status === STATUS_NEWEST.LOADING
            ? <Text>Loading...</Text>
            : <>

                {/** ActionBar */}
                <Flex wrap="wrap" gap="4" width={'100%'} justifyContent={"end"}>
                    {/** Navigation History */}
                    {/* <NavigationHistory /> */}
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