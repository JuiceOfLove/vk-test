import { Context } from "@/main";
import { Box, Button, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const FavouriteList = () => {
    const {store} = useContext(Context);
    const favoriteReps = store.repositories.filter((rep) => rep.favorite);

    return (
        <Box p={4}>
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
                        p={2}
                        border='1px solid #c5c5c5'
                        borderRadius='md'
                    >
                        <Text fontWeight='bold'>
                            {rep.name}
                        </Text>

                        {rep.discription && (
                            <Text fontSize='sm' mb={2}>
                                {rep.discription}
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