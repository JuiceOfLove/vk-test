import { Context } from "@/main";
import { Box, Button, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import SortTabs from "./SortTabs/SortTabs";

const RepoList = () => {
    const { store } = useContext(Context);

    useEffect(() => {
        store.repos()

        const handleScroll = () => {
            const {scrollTop, scrollHeight, clientHeight} = document.documentElement

            if(scrollTop + clientHeight >= scrollHeight - 20) {
                if (!store.isLoading) {
                    store.repos()
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    }, [store])


    return (
        <Box p={8} w="100%">
            <Heading size='lg' mb={4}>
                <SortTabs />
            </Heading>
            <Box
                border='2px solid #77DDE7'
                borderRadius='md'
                p={4}
                margin="0 auto"
                w="60%"
            >
                <VStack align="stretch">
                    {store.repositories.map((rep) => (
                        <Box
                            key={rep.id}
                            p={2}
                            border='1px solid #003153'
                            borderRadius='md'
                            maxH='auto'
                        >
                            <Text fontWeight='bold'>{rep.name}</Text>
                            {rep.description && (
                                <Text fontSize='sm' mb={2}>
                                    {rep.description}
                                </Text>
                            )}

                            {rep.favorite && <Text color="green.500">В избранном</Text>}

                            <Box
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Button
                                    size='sm'
                                    colorScheme='#A2A2D0'
                                    onClick={()=> store.addFavouriteById(rep.id)}
                                >
                                    {rep.favorite ? "Убрать из избранного" : "Добавить в избранное"}
                                </Button>
                                <Button
                                    size='sm'
                                    colorScheme='#7B001C'
                                    onClick={()=> store.deleteRepoById(rep.id)}
                                >
                                    Удалить
                                </Button>
                            </Box>
                        </Box>
                    ))}

                    {store.isLoading && (
                        <Box textAlign="center" p={4}>
                            <Spinner />
                        </Box>
                    )}
                </VStack>
            </Box>
        </Box>
    )
}

export default observer(RepoList)