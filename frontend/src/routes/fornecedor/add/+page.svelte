<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import Button from './../../../lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { FornecedorStore } from './../fornecedor.js';
	import Layout from '../+layout.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import '../../../app.pcss';

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

	//Mensagens de erro
	let invalidMessages = {
		cnpj: 'CNPJ inválido',
		razao_social: 'Razão social inválida',
		email: 'Email inválido',
		cep: 'CEP inválido',
		logradouro: 'Logradouro inválido',
		complemento: 'Complemento inválido',
		municipio: 'Município inválido',
		uf: 'UF inválido',
		ddd: 'DDD inválido',
		telefone: 'Telefone inválido'
	};

	//validando antes de enviar as informações
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
			const endpoint = 'http://localhost:8000/api/fornecedor/';

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

			fetch(endpoint, { method: 'POST', body: data })
				.then((response) => response.json())
				.then((data) => {
					FornecedorStore.update((prev: any) => [...prev, data]);
				});

			goto('/fornecedor/');
		}
	};
</script>

<div>
	<div class="bg-light navbar navbar-expand-lg navbar-light">
		<div class="d-flex align-items-center flex-row">
			<Layout />
		</div>
	</div>
	<h2 class="my-4">Registre um Cliente</h2>
	{#if showInvalidMessages}
		<h4 class="text-danger">O formulario contem dados invalidos</h4>
	{/if}

	<div class="col-12 col-md-6">
		<form on:submit|preventDefault={handleSubmit}>
			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="email">Cnpj</Label>
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

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="email">Razão Social</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && razao_social.length < 4 ? 'is-invalid' : '')}
					type="text"
					placeholder="razao_social"
					bind:value={razao_social}
				/>
				{#if showInvalidMessages && razao_social.length !== 14}
					<p class="text-danger">{invalidMessages.razao_social}</p>
				{/if}
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="email">Email</Label>
				<Input
					class={'form-control ' +
						((showInvalidMessages && !email.includes('@')) || !email.includes('.')
							? 'is-invalid'
							: '')}
					type="text"
					placeholder="email"
					bind:value={email}
				/>
				{#if showInvalidMessages && (!email.includes('@') || !email.includes('.'))}
					<p class="text-danger">{invalidMessages.email}</p>
				{/if}
			</div>
			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="cep">CEP</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && cep.length !== 8 ? 'is-invalid' : '')}
					type="text"
					placeholder="CEP"
					bind:value={cep}
				/>
				{#if showInvalidMessages && cep.length !== 8}
					<p class="text-danger">{invalidMessages.cep}</p>
				{/if}
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="logradouro">Logradouro</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && logradouro.length < 4 ? 'is-invalid' : '')}
					type="text"
					placeholder="Logradouro"
					bind:value={logradouro}
				/>
				{#if showInvalidMessages && logradouro.length < 4}
					<p class="text-danger">{invalidMessages.logradouro}</p>
				{/if}
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="complemento">Complemento</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && complemento.length < 4 ? 'is-invalid' : '')}
					type="text"
					placeholder="Complemento"
					bind:value={complemento}
				/>
				{#if showInvalidMessages && complemento.length < 4}
					<p class="text-danger">{invalidMessages.complemento}</p>
				{/if}
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="municipio">Município</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && municipio.length < 4 ? 'is-invalid' : '')}
					type="text"
					placeholder="Município"
					bind:value={municipio}
				/>
				{#if showInvalidMessages && municipio.length < 4}
					<p class="text-danger">{invalidMessages.municipio}</p>
				{/if}
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="uf">UF</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && uf.length !== 2 ? 'is-invalid' : '')}
					type="text"
					placeholder="UF"
					bind:value={uf}
				/>
				{#if showInvalidMessages && uf.length !== 2}
					<p class="text-danger">{invalidMessages.uf}</p>
				{/if}
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="ddd">DDD</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && ddd.length !== 2 ? 'is-invalid' : '')}
					type="text"
					placeholder="DDD"
					bind:value={ddd}
				/>
				{#if showInvalidMessages && ddd.length !== 2}
					<p class="text-danger">{invalidMessages.ddd}</p>
				{/if}
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="telefone">Telefone</Label>
				<Input
					class={'form-control ' + (showInvalidMessages && telefone.length < 8 ? 'is-invalid' : '')}
					type="text"
					placeholder="Telefone"
					bind:value={telefone}
				/>
				{#if showInvalidMessages && telefone.length < 8}
					<p class="text-danger">{invalidMessages.telefone}</p>
				{/if}
			</div>
			<div class="button">
				<Button class="btn btn-primary" type="submit">Submit</Button>
			</div>
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
	.col-12 {
		padding-top: 50px;
	}
	.button {
		padding-top: 50px;
	}
	.grid {
		padding-top: 15px;
	}
</style>
