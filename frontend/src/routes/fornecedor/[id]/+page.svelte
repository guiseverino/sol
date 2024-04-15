<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Layout from '../+layout.svelte';
	import { FornecedorStore } from './../fornecedor.js';
	import { onMount } from 'svelte';
	import '../../../app.pcss';
	interface Fornecedor {
		id: string;
		cnpj: string;
		razao_social: string;
		email: string;
		cep: string;
		logradouro: string;
		complemento: string;
		municipio: string;
		uf: string;
		ddd: string;
		telefone: string;
	}
	export let data;
	let fornecedor: Fornecedor | null = null;
	onMount(async function () {
		if ($FornecedorStore.length) {
			fornecedor = $FornecedorStore.find((fornecedor: Fornecedor) => fornecedor.id == data.id);
		} else {
			const endpoint = `http://localhost:8000/api/fornecedor/${data.id}/`;
			let response = await fetch(endpoint);
			if (response.status == 200) {
				fornecedor = await response.json();
			} else {
				fornecedor = null;
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
	{#if fornecedor}
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
					<th scope="col">Contato</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">{fornecedor.id}</th>
					<td>{fornecedor.cnpj}</td>
					<td>{fornecedor.razao_social}</td>
					<td>{fornecedor.email}</td>
					<td>{fornecedor.cep}</td>
					<td>{fornecedor.logradouro}</td>
					<td>{fornecedor.complemento}</td>
					<td>{fornecedor.municipio}</td>
					<td>{fornecedor.uf}</td>
					<td>{fornecedor.ddd}{fornecedor.telefone}</td>
				</tr>
			</tbody>
		</table>

		<Button href="/fornecedor/{fornecedor.id}/update" class="btn-edit">Editar</Button>
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
