import _ from "lodash";
import React from "react";
import { Badge, Card, Flex, Image } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { FcLike } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";

import getRandomColor from "@/utils/getRandomColor"

export interface Props {
  id: string;
  thumbnail: string;
  season: string | null;
  yearStart: number;
  title: string;
  type: string;
  goToDetails: Function;
  addToFavorites: Function;
  additional?: React.ReactElement
}

const Component: React.FC<Props> = ({ id, thumbnail, yearStart, season, title, type, goToDetails, addToFavorites, additional }) => {

  return (<Card.Root maxW={'180px'} overflow="hidden">

    <Image
      src={thumbnail}
      alt="Green double couch with wooden legs"
    />

    <Card.Body gap="2">
      <Card.Title lineClamp="3">
        {yearStart && <Badge colorPalette={getRandomColor()}>{yearStart}</Badge>}
        {season && <Badge colorPalette={getRandomColor()}>{season}</Badge>}
      </Card.Title>
      <Card.Title lineClamp="3">{title}</Card.Title>
      {type && <Card.Description>{type}</Card.Description>}
    </Card.Body>

    <Card.Footer>
      <Flex gap="2" wrap='wrap'>

        <IconButton onClick={() => goToDetails(id)} aria-label="Details" variant="surface" size="xs">
          <FcViewDetails />
        </IconButton>

        {!additional && <IconButton onClick={() => addToFavorites(title, id)} aria-label="Add to my list" variant="ghost" size="xs">
          <FcLike />
        </IconButton>}

        {additional && additional}

      </Flex>
    </Card.Footer>

  </Card.Root>)
}

export default Component;