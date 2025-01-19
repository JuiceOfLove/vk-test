import { Context } from "@/main";
import { Box, Button, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const FavouriteList = () => {
    const {store} = useContext(Context);
    const favoriteReps = store.repositories.filter((rep) => rep.favorite);

    return (
        <Box p={8} w="100%">
            <Heading size="lg" mb={4}>
                Избранные
            </Heading>
            {store.isLoading && (
                <Box textAlign="center" p={4}>
                    <Spinner />
                </Box>
            )}

            <VStack align="stretch">
                {favoriteReps.map((rep) => (
                    <Box
                        key={rep.id}
                        border='2px solid #77DDE7'
                        borderRadius='md'
                        p={4}
                        margin="0 auto"
                        w="60%"
                    >
                        <Text fontWeight='bold'>
                            {rep.name}
                        </Text>

                        {rep.description && (
                            <Text fontSize='sm' mb={2}>
                                {rep.description}
                            </Text>
                        )}

                        <Button
                            size='sm'
                            colorScheme='#A2A2D0'
                            onClick={()=> store.addFavouriteById(rep.id)}
                        >
                            Убрать из избранного
                        </Button>
                    </Box>
                ))}
            </VStack>

        </Box>
    )
}

export default observer(FavouriteList)