import FavouriteList from "@/components/screen/RepoList/FavouriteList/FavouriteList"
import RepoList from "@/components/screen/RepoList/RepoList"
import { Tabs } from "@chakra-ui/react"

const Header = () => {
  return (
      <Tabs.Root defaultValue = "default">
        <Tabs.List gap={5} pl={3}>
          <Tabs.Trigger value="default">
            Репозитории
          </Tabs.Trigger>
          <Tabs.Trigger value="favorite">
            Избранное
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="default"><RepoList /></Tabs.Content>
        <Tabs.Content value="favorite"><FavouriteList /></Tabs.Content>
      </Tabs.Root>
  )
}

export default Header