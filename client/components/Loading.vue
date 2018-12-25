<template>
    <div class="loader" :class="classBox">
        <span class="loader-item loader-item1">1</span>
        <span class="loader-item loader-item2">2</span>
        <span class="loader-item loader-item3">3</span>
        <span class="loader-item loader-item4">4</span>
        <span class="loader-item loader-item5">5</span>
        <span class="loader-item loader-item6">6</span>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: Number,
            }
        },
        data() {
            return {
                classBox: "loader--flipDelay loader--3d"
            }
        },
        mounted() {
            switch (this.type) {
                case 1:
                    this.classBox = "loader--flipDelayDown loader--3d";
                    break;
                case 2:
                    this.classBox = "loader--slowFlip";
                    break;
                case 3:
                    this.classBox = "loader--slowFlip loader--3d";
                    break;
                case 4:
                    this.classBox = "loader--flipHoz loader--3d";
                    break;
                case 5:
                    this.classBox = "loader--slideDown";
                    break;
                case 6:
                    this.classBox = "loader--slideUp";
                    break;
                case 7:
                    this.classBox = "loader--slideBoth";
                    break;
                default:
                    this.classBox = "loader--flipDelay loader--3d";
    
            }
        }
    }
</script>

<style lang="scss" scoped>
    .loader {
        display: block;
        overflow: hidden;
        margin-bottom: 15%;
        font-size: 0;
    }
    
    .loader--3d {
        transform-style: preserve-3d;
        perspective: 800px;
    }
    
    .loader--slideBoth {
        overflow: visible;
    }
    
    .loader-item {
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 2px;
        background-color: rgba(61, 92, 126, 0.7);
        color: rgba(61, 92, 126, 0.7);
        animation-duration: 2000ms;
        animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
        animation-iteration-count: infinite;
    }
    
    .loader-item1 {
        background-color: rgba($color: #4B88E5, $alpha: 0.8);
    }
    
    .loader-item2 {
        background-color: rgba($color: #4B88E5, $alpha: 0.8);
    }
    
    .loader-item3 {
        background-color: rgba($color: #4B88E5, $alpha: 0.8);
    }
    
    .loader-item4 {
        background-color: rgba($color: #4B88E5, $alpha: 0.8);
    }
    
    .loader-item5 {
        background-color: rgba($color: #4B88E5, $alpha: 0.8);
    }
    
    .loader-item6 {
        background-color: rgba($color: #4B88E5, $alpha: 0.8);
    }
    
    .loader-item:nth-child(1) {
        animation-delay: 100ms;
    }
    
    .loader-item:nth-child(2) {
        animation-delay: 200ms;
    }
    
    .loader-item:nth-child(3) {
        animation-delay: 300ms;
    }
    
    .loader-item:nth-child(4) {
        animation-delay: 400ms;
    }
    
    .loader-item:nth-child(5) {
        animation-delay: 500ms;
    }
    
    .loader-item:nth-child(6) {
        animation-delay: 600ms;
    }
    
    .loader--slowFlip .loader-item {
        animation-name: slowFlip;
    }
    
    .loader--flipHoz .loader-item {
        animation-name: flipHoz;
    }
    
    .loader--fade .loader-item {
        animation-name: fade;
        animation-duration: 1000ms;
    }
    
    .loader--slowFlip .loader-item:nth-child(1),
    .loader--flipHoz .loader-item:nth-child(1) {
        animation-delay: 150ms;
    }
    
    .loader--slowFlip .loader-item:nth-child(2),
    .loader--flipHoz .loader-item:nth-child(2) {
        animation-delay: 300ms;
    }
    
    .loader--slowFlip .loader-item:nth-child(3),
    .loader--flipHoz .loader-item:nth-child(3) {
        animation-delay: 450ms;
    }
    
    .loader--slowFlip .loader-item:nth-child(4),
    .loader--flipHoz .loader-item:nth-child(4) {
        animation-delay: 600ms;
    }
    
    .loader--slowFlip .loader-item:nth-child(5),
    .loader--flipHoz .loader-item:nth-child(5) {
        animation-delay: 750ms;
    }
    
    .loader--slowFlip .loader-item:nth-child(6),
    .loader--flipHoz .loader-item:nth-child(6) {
        animation-delay: 900ms;
    }
    
    .loader--flipDelay .loader-item {
        animation-name: flipDelay;
    }
    
    .loader--flipDelayDown .loader-item {
        animation-name: flipDelay;
        animation-direction: reverse;
    }
    
    .loader--slideDown .loader-item,
    .loader--slideUp .loader-item {
        animation-name: slideDown;
        animation-duration: 800ms;
        animation-timing-function: linear;
    }
    
    .loader--slideDown .loader-item {
        transform-origin: top left;
    }
    
    .loader--slideUp .loader-item {
        transform-origin: bottom left;
    }
    
    .loader--slideBoth .loader-item {
        animation-name: slideBoth;
        animation-duration: 1000ms;
        transform-origin: bottom left;
        animation-timing-function: linear;
    }
    
    
    /**********************************/
    
    
    /* KEYFRAME ANIMATION DEFINITIONS */
    
    
    /**********************************/
    
    @keyframes slowFlip {
        0% {
            transform: rotateX(0deg);
        }
        40% {
            transform: rotateX(180deg);
        }
        100% {
            transform: rotateX(180deg);
        }
    }
    
    @keyframes flipHoz {
        0% {
            transform: rotateY(0deg);
        }
        40% {
            transform: rotateY(180deg);
        }
        100% {
            transform: rotateY(180deg);
        }
    }
    
    @keyframes fade {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    
    @keyframes flipDelay {
        0% {
            transform: rotateX(0deg);
            transform-origin: 0 0 0;
            opacity: 1;
        }
        30% {
            transform: rotateX(90deg);
            transform-origin: 0 0 0;
            opacity: 0;
        }
        40% {
            transform-origin: 0 0 0;
        }
        60% {
            transform: rotateX(90deg);
            opacity: 0;
            transform-origin: 0 100% 0;
        }
        90% {
            transform: rotateX(0deg);
            opacity: 1;
            transform-origin: 0 100% 0;
        }
    }
    
    @keyframes slideDown {
        0% {
            transform: rotateX(0deg);
        }
        50% {
            transform: rotateX(90deg);
        }
    }
    
    @keyframes slideBoth {
        0% {
            transform: rotateX(0deg);
        }
        100% {
            transform: rotateX(360deg);
        }
    }
</style>
