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
                newTable.number = this.lastTableNumber + 1;
                this.tables.push(newTable);
                this.lastTableNumber++;
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
            // setTableFree(tableNumber) {
            //     this.tables.forEach((table) => {
            //         if (table.number === tableNumber) {
            //             table.status = this.freeStatus;
            //         }
            //     })
            // },
            // setTableReserved(tableNumber) {
            //     this.tables.forEach((table) => {
            //         if (table.number === tableNumber) {
            //             table.status = this.reservedStatus;
            //         }
            //     })
            // },
        },
        computed: {
            freeTables() {
                return this.tables.filter((table) => {
                    if (table.status === 'free') {
                        return table;
                    }
                })
            },
            reservedTables() {
                return this.tables.filter((table) => {
                    if (table.status === 'reserved') {
                        return table;
                    }
                })
            },
            firstFreeTableNumber() {
                // this.lastTableNumber
            }
        }

    })
}