<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<style>
.button{
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    font-weight: 600;
    background-color: #fff;
    border-radius: 3px;
    padding: 10px 20px;
}
</style>