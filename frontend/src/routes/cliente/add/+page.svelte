<script lang="ts">
	// import { Cliente } from './../../../cliente.d.ts';
	import { ClienteStore } from '../cliente.js';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import Layout from '.././+layout.svelte';
	import '../../../app.pcss';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let cnpj = '';
	let razao_social = '';
	let email = '';
	let cep = '';
	let logradouro = '';
	let complemento = '';
	let municipio = '';
	let uf = '';
	let faturamento = '';
	let site = '';
	let ddd = '';
	let telefone = '';
	let files: FileList;
	let showInvalidMessages = false;

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
		if (site.length < 8 || (!site.includes('www') && !site.includes('.'))) valid = false;
		if (ddd.length !== 2) valid = false;
		if (telefone.length < 8) valid = false;
		if (!files || files.length === 0) valid = false;

		if (valid) {
			const endpoint = 'http://localhost:8000/api/cliente/';
			let data = new FormData();
			data.append('cnpj', cnpj);
			data.append('razao_social', razao_social);
			data.append('email', email);
			data.append('cep', cep);
			data.append('logradouro', logradouro);
			data.append('complemento', complemento);
			data.append('municipio', municipio);
			data.append('uf', uf);
			data.append('faturamento', faturamento);
			data.append('site', site);
			data.append('ddd', ddd);
			data.append('telefone', telefone);
			data.append('image', files[0]);

			fetch(endpoint, { method: 'POST', body: data })
				.then((response) => response.json())
				.then((data) => {
					ClienteStore.update((prev: any) => [...prev, data]);
				});

			goto('/cliente/');
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
				<Label for="faturamento">Faturamento</Label>
				<Input
					class="form-control"
					type="text"
					placeholder="Faturamento"
					bind:value={faturamento}
				/>
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="site">Site</Label>
				<Input
					class={'form-control ' +
						((showInvalidMessages && site.length < 8) ||
						!site.includes('www') ||
						!site.includes('.')
							? 'is-invalid'
							: '')}
					type="text"
					placeholder="Site"
					bind:value={site}
				/>
				{#if showInvalidMessages && (site.length < 8 || !site.includes('www') || !site.includes('.'))}
					<p class="text-danger">{invalidMessages.site}</p>
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

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label>Imagem do Cliente</Label>
				<input class="form-control" type="file" bind:files />
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
	.grid {
		padding-bottom: 10px;
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
