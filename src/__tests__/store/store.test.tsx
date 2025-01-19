import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import Store from '@/store/index';
import { IGitHubRepo } from '@/types/github';

jest.mock('@/services/api.service', () => ({
  __esModule: true,
  default: class RepoServiceMock {
    static getRepos() {
      return Promise.resolve({
        data: {
          items: [
            {
              id: 123,
              name: 'test-repo',
              description: 'test-description',
            },
          ],
        },
      });
    }
  },
}));

describe('Store tests', () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it('Имеет правильное начальное состояние', () => {
    expect(store.repositories).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.page).toBe(1);
    expect(store.perPage).toBe(8);
    expect(store.sort).toBe('stars');
    expect(store.order).toBe('desc');
  });

  it('setLoading меняет состояние isLoading', () => {
    store.setLoading(true);
    expect(store.isLoading).toBe(true);

    store.setLoading(false);
    expect(store.isLoading).toBe(false);
  });

  it('resetData сбрасывает page и repositories', () => {
    store.repositories = [{ id: 1, name: 'fake repo', description: '' }];
    store.page = 5;

    store.resetData();
    expect(store.repositories).toEqual([]);
    expect(store.page).toBe(1);
  });

  it('setSort корректно устанавливает sort и order и сбрасывает данные', () => {
    const resetDataSpy = jest.spyOn(store, 'resetData');
    const reposSpy = jest.spyOn(store, 'repos');

    store.setSort('updated', 'asc');

    expect(store.sort).toBe('updated');
    expect(store.order).toBe('asc');
    expect(resetDataSpy).toHaveBeenCalledTimes(1);
    expect(reposSpy).toHaveBeenCalledTimes(1);
  });

  it('repos() подгружает данные и обновляет store.repositories', async () => {
    expect(store.repositories).toHaveLength(0);

    await store.repos();

    expect(store.repositories).toHaveLength(1);
    expect(store.repositories[0].name).toBe('test-repo');

    expect(store.page).toBe(2);
  });

  it('deleteRepoById корректно удаляет репозиторий по ID', () => {
    store.repositories = [
      { id: 1, name: 'Repo1', description: '' },
      {
        id: 2, name: 'Repo2', description: '',
      },
    ];

    store.deleteRepoById(1);
    expect(store.repositories).toHaveLength(1);
    expect(store.repositories[0].id).toBe(2);
  });

  it('addFavouriteById переключает favorite у нужного репозитория', () => {
    store.repositories = [
      { id: 1, name: 'Repo1', description: '' },
      { id: 2, name: 'Repo2', description: '', favorite: true },
    ] as IGitHubRepo[];

    store.addFavouriteById(1);
    expect(store.repositories[0].favorite).toBe(true);

    store.addFavouriteById(2);
    expect(store.repositories[1].favorite).toBe(false);
  });
});
