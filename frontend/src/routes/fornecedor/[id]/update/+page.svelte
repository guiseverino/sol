<script lang="ts">
	import { FornecedorStore } from './../../fornecedor.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Layout from '../../+layout.svelte';
	import '../../../../app.pcss';
	import { Button } from '$lib/components/ui/button';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Input } from '$lib/components/ui/input/index.js';

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
	let cnpj = '';
	let razao_social = '';
	let email = '';
	let cep = '';
	let logradouro = '';
	let complemento = '';
	let municipio = '';
	let uf = '';
	let ddd = '';
	let telefone = '';
	let showInvalidMessages = false;
	export let data;
	let id: string;

	let invalidMessages = {
		cnpj: 'CNPJ inválido',
		razao_social: 'Razão social inválida',
		email: 'Email inválido',
		cep: 'CEP inválido',
		logradouro: 'Logradouro inválido',
		complemento: 'Complemento inválido',
		municipio: 'Município inválido',
		uf: 'UF inválido',
		faturamento: 'Faturamento inválido',
		site: 'Site inválido',
		ddd: 'DDD inválido',
		telefone: 'Telefone inválido',
		files: 'Coloque uma imagem'
	};

	let handleSubmit = () => {
		showInvalidMessages = true;
		let valid = true;
		if (cnpj.length !== 14) valid = false;
		if (razao_social.length < 4) valid = false;
		if (!email.includes('@') || !email.includes('.')) valid = false;
		if (cep.length !== 8) valid = false;
		if (logradouro.length < 4) valid = false;
		if (complemento.length < 4) valid = false;
		if (municipio.length < 4) valid = false;
		if (uf.length !== 2) valid = false;
		if (ddd.length !== 2) valid = false;
		if (telefone.length < 8) valid = false;

		if (valid) {
			const endpoint = `http://localhost:8000/api/fornecedor/${id}/`;
			let data = new FormData();
			data.append('cnpj', cnpj);
			data.append('razao_social', razao_social);
			data.append('email', email);
			data.append('cep', cep);
			data.append('logradouro', logradouro);
			data.append('complemento', complemento);
			data.append('municipio', municipio);
			data.append('uf', uf);
			data.append('ddd', ddd);
			data.append('telefone', telefone);

			fetch(endpoint, { method: 'PUT', body: data })
				.then((response) => response.json())
				.then((data) => {
					FornecedorStore.update((prev: Fornecedor) => {
						let editarFornecedor = $FornecedorStore.slice();
						let index = editarFornecedor.findIndex(
							(fornecedor: Fornecedor) => fornecedor.id == data.id
						);
						editarFornecedor[index] = data;
						return editarFornecedor;
					});
				});

			goto('/fornecedor/');
		}
	};
	onMount(async function () {
		id = data.id;
		let fornecedor: Fornecedor | null = null;
		if ($FornecedorStore.length) {
			fornecedor = $FornecedorStore.find((fornecedor: Fornecedor) => fornecedor.id == id);
		} else {
			const endpoint = `http://localhost:8000/api/fornecedor/${data.id}/`;
			let response = await fetch(endpoint);
			if (response.status == 200) {
				fornecedor = await response.json();
			} else {
				fornecedor = null;
			}
		}
		if (fornecedor) {
			({ cnpj, razao_social, email, cep, logradouro, complemento, municipio, uf, ddd, telefone } =
				fornecedor);
		}
	});
</script>

<div>
	<div class="bg-light navbar navbar-expand-lg navbar-light">
		<div class="d-flex align-items-center flex-row">
			<Layout />
		</div>
	</div>
	<h2 class="my-4">Editando o Fornecedor</h2>
	{#if showInvalidMessages}
		<h4 class="text-danger">O formulario contem dados invalidos</h4>
	{/if}

	<div class="col-12 col-md-6">
		<form on:submit|preventDefault={handleSubmit}>
			<div class="mb-3">
				<Label>CNPJ</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && cnpj.length !== 14 ? 'is-invalid' : '')}
					type="text"
					placeholder="cnpj"
					bind:value={cnpj}
				/>
				{#if showInvalidMessages && cnpj.length !== 14}
					<p class="text-danger">{invalidMessages.cnpj}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>Razao Social</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && razao_social.length < 4 ? 'is-invalid' : '')}
					type="text"
					placeholder="razao_social"
					bind:value={razao_social}
				/>
				{#if showInvalidMessages && razao_social.length < 4}
					<p class="text-danger">{invalidMessages.razao_social}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>Email</Label>
				<Input
					class={'form-control ' +
						((showInvalidMessages && !email.includes('@')) || !email.includes('.')
							? 'is-invalid'
							: '')}
					type="text"
					placeholder="email"
					bind:value={email}
				/>
				{#if (showInvalidMessages && !email.includes('@')) || !email.includes('.')}
					<p class="text-danger">{invalidMessages.email}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>Cep</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && cep.length !== 8 ? 'is-invalid' : '')}
					type="text"
					placeholder="cep"
					bind:value={cep}
				/>
				{#if showInvalidMessages && cep.length !== 8}
					<p class="text-danger">{invalidMessages.cep}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>Logradouro</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && logradouro.length < 4 ? 'is-invalid' : '')}
					type="text"
					placeholder="logradouro"
					bind:value={logradouro}
				/>
				{#if showInvalidMessages && logradouro.length < 4}
					<p class="text-danger">{invalidMessages.logradouro}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>Complemento</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && complemento.length < 4 ? 'is-invalid' : '')}
					type="text"
					placeholder="complemento"
					bind:value={complemento}
				/>
				{#if showInvalidMessages && complemento.length < 4}
					<p class="text-danger">{invalidMessages.complemento}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>Municipio</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && municipio.length < 4 ? 'is-invalid' : '')}
					type="text"
					placeholder="municipio"
					bind:value={municipio}
				/>
				{#if showInvalidMessages && municipio.length < 4}
					<p class="text-danger">{invalidMessages.municipio}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>UF</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && uf.length !== 2 ? 'is-invalid' : '')}
					type="text"
					placeholder="uf"
					bind:value={uf}
				/>
				{#if showInvalidMessages && uf.length !== 2}
					<p class="text-danger">{invalidMessages.uf}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>DDD</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && ddd.length !== 2 ? 'is-invalid' : '')}
					type="text"
					placeholder="ddd"
					bind:value={ddd}
				/>
				{#if showInvalidMessages && ddd.length !== 2}
					<p class="text-danger">{invalidMessages.ddd}</p>
				{/if}
			</div>
			<div class="mb-3">
				<Label>Telefone</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && telefone.length < 8 ? 'is-invalid' : '')}
					type="text"
					placeholder="telefone"
					bind:value={telefone}
				/>
				{#if showInvalidMessages && telefone.length < 8}
					<p class="text-danger">{invalidMessages.telefone}</p>
				{/if}
			</div>
			<Button class="btn btn-primary" type="submit">Submit</Button>
		</form>
	</div>
</div>

<style>
	.bg-light {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	.my-4 {
		padding-top: 100px;
	}
	h2 {
		font-family: 'Arial Black', Times, fantasy;
		font-size: 30px;
		padding-bottom: 30px;
	}
</style>
