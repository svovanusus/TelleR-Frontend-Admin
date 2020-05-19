<template>
  <content-wrapper-with-title title="Dashboard">
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, aliquam illum.
      Ea eaque laudantium quasi nobis? Impedit similique et nulla? Dignissimos ipsum
      facere, dolore delectus error eius alias quidem minus!
    </p>
    <p>
      Harum, iure laboriosam, veniam debitis reprehenderit ea nulla, necessitatibus
      earum atque mollitia temporibus itaque quidem adipisci sapiente veritatis! Aliquam
      doloribus saepe officia, aliquid cum tenetur numquam illum molestiae suscipit debitis.
    </p>
    <p>
      Quo similique voluptatibus ab enim explicabo exercitationem nesciunt facilis. Et
      accusamus dicta optio natus iste velit similique illo perferendis eius nam nobis quasi
      est earum totam officia consequatur, maiores modi.
    </p>
    <p>
      Mollitia amet libero error ad rem optio. Voluptas accusamus recusandae debitis
      voluptatum nostrum harum, at fuga saepe accusantium alias, dolores quaerat aliquid
      eveniet unde corrupti eius suscipit quos dicta consequatur.
    </p>
    <p>
      Iste a ut nam est! Nobis minus eligendi facilis, deserunt praesentium molestias a
      vero aliquam et ab aut error rem at laboriosam quod quis. Est nostrum corrupti nihil
      necessitatibus architecto?
    </p>
    <p>
      Illo explicabo eius eaque sequi aut similique velit, dicta dolorem pariatur unde nobis
      veniam recusandae facilis, reiciendis impedit amet debitis aliquid! Distinctio deserunt
      ullam facere ab nesciunt nulla, excepturi quo!
    </p>
    <p>
      Rerum voluptatum ipsam ullam nihil magnam soluta at inventore! Eos, odit distinctio,
      dicta ipsam quibusdam nesciunt aspernatur dignissimos debitis obcaecati, eius minus
      tempora. Facilis voluptatem totam incidunt ipsam laboriosam nemo?
    </p>
    <p>
      Libero velit esse deleniti, maxime et repellat. Autem iure, nesciunt blanditiis voluptates,
      accusantium voluptate tempora illum dolorum at incidunt aliquid voluptatem recusandae
      molestias eveniet fugiat repellat doloribus? Veritatis, ea enim.
    </p>
    <p>
      Rerum, hic corrupti nihil veritatis sit placeat suscipit dolor maiores eum magni reiciendis
      quibusdam enim facilis natus velit porro tempora perspiciatis culpa aspernatur voluptate
      optio. Culpa a vitae esse modi!
    </p>
    <p>
      Odio officia sit ad, alias porro quae exercitationem autem reprehenderit rem expedita
      soluta numquam. Ducimus, eaque saepe dicta voluptas iusto accusamus, animi vel maiores,
      adipisci vitae iure veniam tenetur laborum.
    </p>
    <p>
      Laboriosam aut obcaecati consectetur quae vel ab, nisi minima quo libero alias ullam
      provident itaque deleniti, unde ea quos eius commodi placeat perspiciatis autem natus.
      Nostrum beatae nemo culpa earum.
    </p>
    <p>
      Necessitatibus molestias maxime sed iste? Delectus nulla ullam nam totam corporis
      laborum corrupti, repellendus pariatur ipsam rerum suscipit architecto praesentium,
      consequuntur commodi nobis reiciendis hic sed magni quidem cum voluptatem!
    </p>
    <p>
      A expedita vitae quia iure velit sit vero quo autem similique commodi tempora neque
      omnis possimus provident facilis explicabo, illo ea aperiam consequatur iste quos
      dolores doloremque maiores repellendus! Veniam?
    </p>
    <p>
      Molestias repellat illum dolore quia eum dignissimos, nostrum dolorem? Soluta fugit
      optio in harum perferendis unde voluptatibus delectus numquam aliquam id dolores
      obcaecati praesentium adipisci ex sit, modi asperiores cumque.
    </p>
    <p>
      Fugit voluptates suscipit officiis, distinctio libero aliquid quisquam asperiores
      perferendis aspernatur deserunt necessitatibus nihil tempora dolore deleniti expedita
      laudantium nemo harum soluta? Illum alias minus ut quis nobis doloribus provident.
    </p>
    <p>
      Ipsa, a voluptates, laboriosam doloribus cumque tempore nihil molestiae fuga nobis
      perferendis qui eum accusantium, tempora quos quasi reprehenderit eius aliquam
      aperiam obcaecati ab labore magni vero ea accusamus. Minus.
    </p>
  </content-wrapper-with-title>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'dashboard-view',
  components: {
    ContentWrapperWithTitle: () => import('@/components/ContentWrapperWithTitle.vue'),
  },
})
export default class DashboardView extends Vue {

}
</script>
