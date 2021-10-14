import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tell appolo we will take care of data
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // read numberr of items from cache

      const data = cache.readQuery({
        query: PAGINATION_QUERY,
      });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if itmes have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If there are items and arent enough items to satify how many as we requested
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        return false;
      }

      // if there are items fetch from cache instead of network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Send tpo apollo`
        );
        return items;
      }
      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when apollo comes back with the network

      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
