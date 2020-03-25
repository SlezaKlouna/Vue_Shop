<template>
    <div class="popup-wrapper" ref="popup-wrapper">
        <div class="v-popup">
            <div class="v-popup__header">
                <span>{{popupTitle}}</span>
                <span>
                <i
                        class="material-icons popup-close-btn"
                        @click="closePopup"
                >
                    close
                </i>
            </span>
            </div>
            <div class="v-popup__content">
                <slot></slot>
            </div>
            <div class="v-popup__footer">
                <button
                        class="close_modal"
                        @click="closePopup"
                >
                    Close
                </button>
                <button
                        class="submiy_btn"
                        @click="rightBtnAction"
                >
                    {{rightBtnTitle}}
                </button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "v-popup",
        props:{
            rightBtnTitle: {
                type: String,
                default: 'Ok'
            },
            popupTitle: {
                type: String,
                default: 'Popup name'
            }
        },
        methods: {
            rightBtnAction(){
                this.$emit('rightBtnAction')
            },
            closePopup(){
                this.$emit('closePopup')
            }
        },
        mounted() {
            let vm = this;
            document.addEventListener('click', item =>{
                if (item.target === vm.$refs['popup-wrapper']){
                    vm.closePopup();
                }
            })
        }
    }
</script>

<style lang="scss">
    .popup-wrapper{
        background-color: rgba(64, 64, 64, .7);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    .v-popup{
        padding: 16px;
        position: fixed;
        top: 15%;
        width: 50%;
        background: $main-color;
        box-shadow: 0 0 17px 0 $shadowColor;
        z-index: 10;

        &__header, &__footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__content{
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 15px;
        }
        .submiy_btn, .close_modal{
            padding: $padding;
            background-color: $mainTextColor;
            color: $main-color;
            border: 1px transparent;
            text-transform: uppercase;
            cursor: pointer;
            outline: none;
            transition: .3ms ease-in;

            &:hover{
                background-color: $main-color;
                border: 1px solid $mainTextColor;
                color: $mainTextColor;
            }
        }
        .close_modal{
            background-color: $primaryColor;
            border: 1px solid transparent;
            &:hover{
                background-color: $main-color;
                border: 1px solid $primaryColor;
                color: $primaryColor;
            }
        }
        .popup-close-btn{
            cursor: pointer;
            &:hover{
                color: $primaryColor;
            }
        }
    }
</style>