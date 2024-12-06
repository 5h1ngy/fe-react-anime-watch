import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Box, Center, createListCollection, Separator } from "@chakra-ui/react"
import { Text, HStack, Flex, Spacer } from "@chakra-ui/react";

import { IconButton } from "@chakra-ui/react"
import { FcLike, FcVideoCall, FcNoVideo } from "react-icons/fc";

import { PaginationNextTrigger, PaginationPageText, PaginationPrevTrigger, PaginationRoot } from "@/components/Chakra/pagination"
import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/Chakra/select"
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb"
import { toaster } from "@/components/Chakra/toaster"
import { Item } from "@/services/anime.types";
import { History } from "@/store/pageLanding";
import { Reference, STATUS, STATUS_REFERENCE } from "@/store/containerMyList";
import withRouter, { WithRouterProps } from "@/hocs/withRouter";
import Card from "@/components/Card"

gsap.registerPlugin(ScrollTrigger);

export interface Props {
    state: {
        landing: {
            history: History[];
        },
        myList: {
            references: Array<Reference>,
            anime: {
                occurrences: Array<Item>,
                status: STATUS;
                error: any;
            }
        },
    };
    actions: {
        landing: {
            clearHistory: Function;
        },
        myList: {
            doGetReferences: Function;
            updateStatus: Function;
        },
    };
}

const Component: React.FC<Props & WithRouterProps> = ({ router, state, actions, }) => {

    const cardsRef = useRef<HTMLDivElement[]>([]);

    function onGoToDetails(id: string) {
        router.navigate(`/details/${id}`)
    }

    function addToFavorites(title: string, id: string) {
        toaster.create({
            title: `${title} Add to favorites `,
            type: 'success',
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })
    }

    {/** Navigation History Component */ }
    const NavigationHistory: React.FC = () => state.landing.history.length != 0 && <BreadcrumbRoot size={"lg"}>
        {state.landing.history.map(history =>
            !history.current
                ? <BreadcrumbLink key={crypto.randomUUID()} href="#">{history.label}</BreadcrumbLink>
                : <BreadcrumbCurrentLink key={crypto.randomUUID()}>{history.label}</BreadcrumbCurrentLink>
        )}
    </BreadcrumbRoot>

    const Cards: React.FC<{ status: STATUS_REFERENCE }> = ({ status }) =>
        <Flex wrap={'wrap'} gap='2rem' align="stretch" justify={"start"}>
            {state.myList.anime.occurrences
                .filter(occurrence => state.myList.references.find(ref => ref.id === occurrence.id && ref.status === status))
                .map((occurrence, index) => (
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
                            addToFavorites={addToFavorites}
                            additional={
                                <>
                                    {(status === STATUS_REFERENCE.TO_WATCH) &&
                                        <IconButton aria-label="Add to my list" variant="ghost" size="xs"
                                            onClick={() => {
                                                actions.myList.updateStatus({ id: occurrence.id, status: STATUS_REFERENCE.WATCHING })
                                            }}
                                        >
                                            <FcVideoCall />
                                        </IconButton>
                                    }
                                    {status === STATUS_REFERENCE.WATCHING &&
                                        <IconButton aria-label="Add to my list" variant="ghost" size="xs" onClick={() => {
                                            actions.myList.updateStatus({ id: occurrence.id, status: STATUS_REFERENCE.COMPLETE })
                                        }}>
                                            <FcNoVideo />
                                        </IconButton>
                                    }
                                    {status === STATUS_REFERENCE.COMPLETE &&
                                        <IconButton aria-label="Add to my list" variant="ghost" size="xs" onClick={() => {
                                            actions.myList.updateStatus({ id: occurrence.id, status: STATUS_REFERENCE.TO_WATCH })
                                        }}>
                                            <FcLike />
                                        </IconButton>
                                    }
                                </>
                            }
                        />
                    </div>
                ))}
        </Flex>

    useEffect(() => {
        actions.myList.doGetReferences();
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

    }, [state.myList.anime.occurrences]);

    return <>
        {state.myList.anime.status === STATUS.LOADING
            ? <Text>Loading...</Text>
            : <>

                {/** ActionBar */}
                {/* <Flex wrap="wrap" gap="4" width={'100%'} justifyContent={"start"}> */}
                {/** Navigation History */}
                {/* <NavigationHistory /> */}
                {/* </Flex> */}

                <Text textStyle="2xl" textAlign={"end"}>To Watch</Text>
                <Separator />
                {/* Cards */}
                <Cards status={STATUS_REFERENCE.TO_WATCH} />

                <Text textStyle="2xl" textAlign={"end"}>Watching</Text>
                <Separator />
                {/* Cards */}
                <Cards status={STATUS_REFERENCE.WATCHING} />

                <Text textStyle="2xl" textAlign={"end"}>Complete</Text>
                <Separator />
                {/* Cards */}
                <Cards status={STATUS_REFERENCE.COMPLETE} />

            </>
        }
    </>
}

export default withRouter(Component);