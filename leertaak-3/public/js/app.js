// import Vue from 'vue'
//
// Vue.config.productionTip = false
// Vue.component('test', require('@/Test'));
Vue.config.devtools = true;
window.onload = function () {
    let app = new Vue({
        el: '#app',
        data: {
            tables: [],
            freeTableObject: {
                status: 'free',
                number: 0
            },
            lastTableNumber: 0,
            deletedTableNumbers: [],

            reservedStatus: 'reserved',
            freeStatus: 'free',
        },
        mounted: function () {
        },
        methods: {
            addTable() {
                let newTable = {...this.freeTableObject};
                newTable.number = this.firstFreeTableNumber();
                this.tables.push(newTable);
            },
            removeTable(tableNumber) {
                this.tables = this.tables.filter((table) => {
                    if (table.status === this.reservedStatus) {
                        return table;
                    }

                    if (table.number !== tableNumber) {
                        return table;
                    }
                });
                this.deletedTableNumbers.push(tableNumber);
            },
            setTableStatus(tableNumber, status) {
                if (status !== this.freeStatus && status !== this.reservedStatus) {
                    return;
                }

                this.tables.forEach((table) => {
                    if (table.number === tableNumber) {
                        table.status = status;
                    }
                })
            },
            firstFreeTableNumber() {
                if (this.deletedTableNumbers.length > 0) {
                    this.deletedTableNumbers.sort((a, b) => a - b);
                    return this.deletedTableNumbers.shift();
                }

                this.lastTableNumber++;
                return this.lastTableNumber;
            }
        },
        computed: {
            freeTables() {
                return this.tables.filter((table) => {
                    if (table.status === 'free') {
                        return table;
                    }
                }).sort((a, b) => a.number - b.number)
            },
            reservedTables() {
                return this.tables.filter((table) => {
                    if (table.status === 'reserved') {
                        return table;
                    }
                }).sort((a, b) => a.number - b.number)
            },
        }

    })
}