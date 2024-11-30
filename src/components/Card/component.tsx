import React from "react";
import { Card, Flex, Image } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { FcLike } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";

export interface Props {
  id: string;
  thumbnail: string;
  title: string;
  type: string;
  goToDetails: Function;
}

const Component: React.FC<Props> = ({ id, thumbnail, title, type, goToDetails }) => (
  <Card.Root maxW={'200px'} overflow="hidden">

    <Image
      src={thumbnail}
      alt="Green double couch with wooden legs"
    />

    <Card.Body gap="2">
      <Card.Title>{title}</Card.Title>
      <Card.Description>{type}</Card.Description>
    </Card.Body>

    <Card.Footer>
      <Flex gap="2" wrap='wrap'>
        <IconButton aria-label="Details" variant="surface" size="xs">
          <FcViewDetails onClick={() => goToDetails(id)} />
        </IconButton>
        <IconButton aria-label="Add to my list" variant="ghost" size="xs">
          <FcLike />
        </IconButton>
      </Flex>
    </Card.Footer>

  </Card.Root>
)

export default Component;