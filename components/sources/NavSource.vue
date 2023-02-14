<template>
    <div class="nav-source pl-2"> 
      
    <i class="pi pi-fw pi-file"></i>
    <span class="py-1 text-xl">  SOURCES  </span>
    
    <div style="margin-bottom: 1em">
            <Button type="button" icon="pi pi-plus" label="Expand All" @click="expandAll" />
            <Button type="button" icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
        </div>
    <Tree :value="nodes" :filter="true" filterMode="lenient"></Tree>
    </div>  
</template>

<style scoped>
.nav-source{
    height: calc(100vh - 5rem);
    width: 300px;
}
.p-button {
    margin-right: .5rem;
}
</style>

<script setup>
// import NodeService from '@/utils/NodeService';
import dataJson from '@/assets/data/treenodes.json'


onMounted(() => {
            // nodeService.value.getTreeNodes().then(data => nodes.value = data);
            nodes.value = dataJson.root;
        })

        const nodes = ref(null);
        // const nodeService = ref(new NodeService());
        const expandedKeys = ref({});
        const expandAll = () => {
            for (let node of nodes.value) {
                expandNode(node);
            }

            expandedKeys.value = {...expandedKeys.value};
        };
        const collapseAll = () => {
            expandedKeys.value = {};
        };
        const expandNode = (node) => {
            expandedKeys.value[node.key] = true;
            if (node.children && node.children.length) {
                for (let child of node.children) {
                    expandNode(child);
                }
            }
        };


const model = ref([
    {
        label: 'Article1',
        items: [
            { label: 'Section1', to: '/' },
            { label: 'Section2', 
            items: [
                { label: 'Clause 1', to: '/clause1'},
                { label: 'Clause 2', to: '/clause2'},
                { label: 'Clause 3', to: '/clause3'}
                        ] },
        ]
    },
    {
        label: 'Article2',
        items: [
            { label: 'Section1', 
            items: [
                { label: 'Clause 1', to: '/clause1'},
                { label: 'Clause 2 et 3', to: '/clause2'}
            ],
            label: 'Section2', 
            items: [
                { label: 'Clause 1', to: '/clause1'},
                { label: 'Clause 2 et 3', to: '/clause2'}
                        ] },
        ]
    },

])


</script>