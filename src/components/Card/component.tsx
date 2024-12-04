import _ from "lodash";
import React from "react";
import { Badge, Card, Flex, Image } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { FcLike } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";

export interface Props {
  id: string;
  thumbnail: string;
  season: string;
  yearStart: number;
  title: string;
  type: string;
  goToDetails: Function;
}


function getRandomColor(): 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink' | 'accent' {
  const colors: Array<'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink' | 'accent'> = [
    'gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink', 'accent'
  ];
  return _.sample(colors)!;
}

const Component: React.FC<Props> = ({ id, thumbnail, yearStart, season, title, type, goToDetails }) => (
  <Card.Root maxW={'180px'} overflow="hidden">

    <Image
      src={thumbnail}
      alt="Green double couch with wooden legs"
    />

    <Card.Body gap="2">
      <Card.Title lineClamp="3">
        <Badge colorPalette={getRandomColor()}>{yearStart}</Badge>
        <Badge colorPalette={getRandomColor()}>{season}</Badge>
      </Card.Title>
      <Card.Title lineClamp="3">{title}</Card.Title>
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