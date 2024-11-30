import { ReactElement } from "react";
import { Flex, HStack } from "@chakra-ui/react"
import { Spacer, Center } from "@chakra-ui/react"
import { Tabs, Image } from "@chakra-ui/react"

import { ColorModeButtonExtended } from "@/components/Chakra/color-mode"

interface NavbarItems {
    icon: ReactElement
    label: string
    value: string
    default: boolean
}

interface ComponentProps {
    children?: ReactElement
    navbarItems: Array<NavbarItems>
}

export default function Component(props: ComponentProps) {
    const { children, navbarItems } = props

    return <Flex direction={"column"} width={"100%"} minHeight={'100vh'}>

        {/* <Image src="/background.png" position={'fixed'} zIndex={0} left={0} bottom={0} /> */}
        <Image src="/background.png" position={'fixed'} transform="scaleX(-1)" zIndex={0} right={0} bottom={0} />

        <HStack position={"fixed"} zIndex={'2'} width={"100%"} top={0} paddingX={'10%'}
            borderWidth="1px" backgroundColor={"white"} _dark={{ backgroundColor: "black" }}
        >

            <Center width={"100%"}>

                <Image src="/logo.png" />

                <h3>About</h3>

                <Spacer />

                <Flex paddingX={'10%'} marginTop={'3rem'} >
                    <Tabs.Root key={crypto.randomUUID()}
                        defaultValue={navbarItems.find(item => item.default)!.value}
                        variant={"line"}
                        size={"sm"}
                        onValueChange={() => { }}
                    >
                        <Tabs.List>
                            {navbarItems.map(item => (
                                <Tabs.Trigger key={crypto.randomUUID()} value={item.value}>
                                    {item.icon}
                                    {item.label}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>
                    </ Tabs.Root>
                </Flex>

                <Spacer />

                {/** ColorMode button (custom) */}
                <ColorModeButtonExtended variant="enclosed" size={"sm"} />
            </Center>

        </HStack>

        <Flex direction={"column"} zIndex={'1'} borderWidth="1px" width={"60%"} marginTop={'5.4rem'}
            paddingTop={'3rem'} paddingBottom={'3rem'} marginLeft={"20%"} marginRight={"20%"}
            paddingX={'4rem'} gap={'3rem'}
            minHeight={'100vh'}
            backgroundColor={"white"} _dark={{ backgroundColor: "black" }}
        >
            {children !== undefined && children}
        </Flex>
    </Flex>
}