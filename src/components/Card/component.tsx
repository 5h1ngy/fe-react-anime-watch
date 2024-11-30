import React from "react";
import { Card, Image } from "@chakra-ui/react"
import { Button } from "@/components/Chakra/button"

export interface Props {
  thumbnail: string;
  title: string;
  type: string;
}

const Component: React.FC<Props> = ({ thumbnail, title, type }) => (
  <Card.Root maxW={'250px'} overflow="hidden">

    <Image
      src={thumbnail}
      alt="Green double couch with wooden legs"
    />

    <Card.Body gap="2">
      <Card.Title>{title}</Card.Title>
      <Card.Description>{type}</Card.Description>
    </Card.Body>

    <Card.Footer gap="2">
      <Button variant="solid">Buy now</Button>
      <Button variant="ghost">Add to cart</Button>
    </Card.Footer>
    
  </Card.Root>
)

export default Component;