import { useEffect } from "react";
import DOMPurify from 'dompurify';
import { VStack, HStack, Flex, Center, Spacer } from "@chakra-ui/react";
import { Card, Image, Text, Badge } from "@chakra-ui/react"

import { History } from "@/store/pageLanding";
import { STATUS } from "@/store/containerDetails";
import { Item } from "@/services/details.types";
import withRouter, { WithRouterProps } from "@/hocs/withRouter";
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/Chakra/breadcrumb";
import { Button } from "@/components/Chakra/button"


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
        updateHistory: Function;
    };
}

const Component: React.FC<Props & WithRouterProps> = ({ router, state, actions, }) => {

    {/** Navigation History Component */ }
    const NavigationHistory: React.FC = () => state.history.length != 0 && <BreadcrumbRoot>
        {state.history.map(history =>
            !history.current
                ? <BreadcrumbLink key={crypto.randomUUID()} href="#">{history.label}</BreadcrumbLink>
                : <BreadcrumbCurrentLink key={crypto.randomUUID()}>{history.label}</BreadcrumbCurrentLink>
        )}
    </BreadcrumbRoot>

    useEffect(() => {
        actions.updateHistory({ id: state.occurrence?.id || '', label: `${state.occurrence?.title || ''}`, current: true });
    }, [])

    return <>
        {state.status === STATUS.LOADING
            ? <Text>Loading...</Text>
            : <>

                <NavigationHistory />

                {state.occurrence!.title}

                <Image
                    maxWidth={'250px'}
                    src={state.occurrence?.image.thumbnail}
                    alt="Green double couch with wooden legs"
                />

                {state.occurrence?.tags && <Flex wrap={"wrap"}>{state.occurrence?.tags.map(tag => <Badge>{tag.label}</Badge>)}</Flex>}
                {state.occurrence?.description && <div dangerouslySetInnerHTML={{ __html: state.occurrence!.description }} />}

            </>
        }
    </>
}

export default withRouter(Component);