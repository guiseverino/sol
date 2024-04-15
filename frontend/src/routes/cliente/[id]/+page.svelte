<script lang="ts">
	import { ClienteStore } from '../cliente';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Layout from '.././+layout.svelte';
	import '../../../app.pcss';

	interface Cliente {
		id: string;
		cnpj: string;
		razao_social: string;
		email: string;
		cep: string;
		logradouro: string;
		complemento: string;
		municipio: string;
		uf: string;
		faturamento: number;
		site: string;
		ddd: string;
		telefone: string;
		image: FileList;
	}
	export let data;
	let cliente: Cliente | null = null;
	onMount(async function () {
		if ($ClienteStore.length) {
			cliente = $ClienteStore.find((cliente: Cliente) => cliente.id == data.id);
		} else {
			const endpoint = `http://localhost:8000/api/cliente/${data.id}/`;
			let response = await fetch(endpoint);
			if (response.status == 200) {
				cliente = await response.json();
			} else {
				cliente = null;
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
	{#if cliente}
		<table class="table">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">CNPJ</th>
					<th scope="col">RAZAO SOCIAL</th>
					<th scope="col">EMAIL</th>
					<th scope="col">CEP</th>
					<th scope="col">LOGRADOURO</th>
					<th scope="col">COMPLEMENTO</th>
					<th scope="col">Municipio</th>
					<th scope="col">UF</th>
					<th scope="col">FATURAMENTO</th>
					<th scope="col">SITE</th>
					<th scope="col">Contato</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">{cliente.id}</th>
					<td>{cliente.cnpj}</td>
					<td>{cliente.razao_social}</td>
					<td>{cliente.email}</td>
					<td>{cliente.cep}</td>
					<td>{cliente.logradouro}</td>
					<td>{cliente.complemento}</td>
					<td>{cliente.municipio}</td>
					<td>{cliente.uf}</td>
					<td>{cliente.faturamento}</td>
					<td>{cliente.site}</td>
					<td>{cliente.ddd}{cliente.telefone}</td>
				</tr>
			</tbody>
		</table>

		<Button href="/cliente/{cliente.id}/update" class="btn-edit">Editar</Button>
	{:else}
		<p class="info">nenhum cliente foi criado ainda</p>
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
