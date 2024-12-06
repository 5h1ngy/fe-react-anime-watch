import { ReactElement } from "react";
import { NavLink } from "react-router";
import { Flex } from "@chakra-ui/react"
import { Spacer } from "@chakra-ui/react"
import { Tabs, Image } from "@chakra-ui/react"

import { ColorModeButtonExtended } from "@/components/Chakra/color-mode"

interface NavbarItems {
    icon: ReactElement
    label: string
    value: string
}

interface NavbarSubItems {
    icon: ReactElement
    label: string
    value: string
    default: boolean
}

interface ComponentProps {
    children?: ReactElement
    navbarItems: Array<NavbarItems>
    navbarSubItems: Array<NavbarSubItems>
}

export default function Component(props: ComponentProps) {
    const { children, navbarItems, navbarSubItems } = props

    return <Flex direction={"column"} width={"100%"} minHeight={'100vh'}>

        <Flex wrap={"wrap"} position={"fixed"} zIndex={'2'} width={"100%"} top={0}
            backgroundColor={"white"} _dark={{ backgroundColor: "black" }}
            borderYWidth="1px"
        >

            <Flex wrap={"wrap"} direction={"row"} width={'100%'}
                gapX={'1rem'} justifyContent={"center"} justifyItems={"center"} alignContent={'center'} alignItems={'center'}
                paddingX={'5%'} paddingTop={'1rem'}
            >
                <Image src="/logo.png" width={'42px'} />

                {navbarItems.map(item => (
                    <NavLink key={crypto.randomUUID()} to={item.value} end> {item.label}</NavLink>
                ))}

                <Spacer />

                {/** ColorMode button (custom) */}
                <ColorModeButtonExtended variant="enclosed" size={"sm"} />
            </Flex>

            <Flex wrap={"wrap"} direction={"row"} width={'100%'}
                gapX={'1rem'} justifyContent={"start"} justifyItems={"center"} alignContent={'center'} alignItems={'center'}
                paddingX={'10%'}
            >
                <Tabs.Root key={crypto.randomUUID()}
                    defaultValue={navbarSubItems.find(item => item.default)!.value}
                    variant={"line"}
                    size={"sm"}
                    onValueChange={() => { }}
                >
                    <Tabs.List>
                        {navbarSubItems.map(item => (
                            <Tabs.Trigger key={crypto.randomUUID()} value={item.value}>
                                {item.icon}
                                <NavLink to={item.value} end> {item.label}</NavLink>
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                </ Tabs.Root>
            </Flex>

        </Flex>

        <Flex direction={"column"} zIndex={'1'} marginTop={'5.4rem'}
            paddingX={{ base: "5%", sm: "4rem", md: "4rem", lg: '4rem', xl: '15%', "2xl": '15%' }} gap={'3rem'}
            paddingY={'4rem'}
            minHeight={'90.5vh'}
            borderYWidth="1px"
            backgroundColor={"gray.100"} _dark={{ backgroundColor: "gray.900" }}
        >

            {/* <Image src="/background.png" position={'fixed'} zIndex={0} left={0} bottom={0} /> */}
            <Image src="/background.png" position={'fixed'} transform="scaleX(-1)" zIndex={0} right={0} bottom={0}
                display={{ base: "none", sm: "none", md: "none", lg: 'none', xl: 'block', "2xl": 'block' }}
            />

            {children !== undefined && children}
        </Flex>
    </Flex>
}