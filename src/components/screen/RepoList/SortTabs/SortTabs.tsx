import { Context } from "@/main";
import { SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValueText } from "@ark-ui/react";
import { Box, createListCollection, HStack, SelectRoot } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";

const SortTabs = () => {
    const { store } = useContext(Context);
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        // не дублируем в repoList загрузку
        if (!store.repositories.length) {
            store.repos();
        }
    }, [])

    const handleValue = (val: string) => {
        const [sort, order] = val.split("-");
        store.setSort(sort, order)
        setValue(val);
    }

    const selectValues = createListCollection({
        items: [
            {label: "Stars DESC", value: "stars-desc"},
            {label: "Stars ASC", value: "stars-asc"},
            {label: "Updated DESC", value: "updated-desc"},
            {label: "Updated ASC", value: "updated-asc"},
        ]
    })

    return (
        <Box p={4}>
            <HStack mb="4">
             <SelectRoot
                collection={selectValues}
                width="320px"
                value={value ? [value] : []}
                onValueChange={(e) => {
                    handleValue(e.value[0])
                }}
             >
                <SelectLabel>Сортировка</SelectLabel>
                <SelectTrigger>
                    <SelectValueText placeholder="Выберите порядок" />
                </SelectTrigger>

                <SelectContent>
                    {selectValues.items.map((option) => (
                        <SelectItem item={option} key={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
             </SelectRoot>
            </HStack>
        </Box>
    )
}

export default observer(SortTabs);