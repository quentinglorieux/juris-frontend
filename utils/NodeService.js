export default class NodeService {

    getTreeTableNodes() {
        return fetch('@/assets/data/treetablenodes.json').then(res => res.json())
                .then(d => d.root);
    }
 
    getTreeNodes() {
        return fetch('../assets/data/treenodes.json').then(res => res.json())
                .then(d => d.root);
    }
 }