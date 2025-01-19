import { Context } from "@/main";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import styles from "./SortTabs.module.css";

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

    return (
        <div className={styles.container}>
            <label htmlFor="sort" className={styles.label}>Сортировать по:</label>
            <select
                className={styles.select}
                value={value}
                id="sort"
                onChange={(e) => handleValue(e.target.value)}
            >
                <option value="stars-desc">Stars DESC</option>
                <option value="stars-asc">Stars ASC</option>
                <option value="updated-desc">Updated DESC</option>
                <option value="updated-asc">Updated ASC</option>
            </select>
        </div>
    )
}

export default observer(SortTabs);