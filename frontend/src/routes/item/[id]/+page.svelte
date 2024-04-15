<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Layout from '../+layout.svelte';
	import { ItemStore } from './../item.js';
	import { onMount } from 'svelte';
	import '../../../app.pcss';
	interface Item{
		id: string;
		nome_item:string;
		descricao_item:string;
	}
	export let data;
	let item: Item | null = null;
	onMount(async function () {
		if ($ItemStore.length) {
			item = $ItemStore.find((item: Item) => item.id == data.id);
		} else {
			const endpoint = `http://localhost:8000/api/item/${data.id}/`;
			let response = await fetch(endpoint);
			if (response.status == 200) {
				item = await response.json();
			} else {
				item = null;
			}
		}
	});
</script>

<div class="bg-light navbar navbar-expand-lg navbar-light">
	<div class="d-flex align-items-center flex-row">
		<Layout />
	</div>
</div>
<div class="container">
	{#if item}
		<table class="table">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Nome Item</th>
					<th scope="col">Descrição</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">{item.id}</th>
					<td>{item.nome_item}</td>
					<td>{item.descricao_item}</td>
					
				</tr>
			</tbody>
		</table>

		<Button href="/item/{item.id}/update" class="btn-edit">Editar</Button>
	{:else}
		<p class="info">nenhum fornecedor foi criado ainda</p>
	{/if}
</div>

<style>
	.bg-light {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	.container {
		padding-top: 100px;
	}
</style>
