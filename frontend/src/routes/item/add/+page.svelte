<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import Button from './../../../lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { ItemStore } from './../item.js';
	import Layout from '../+layout.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input/index.js';
	import '../../../app.pcss';

	let nome_item = '';
	let descricao_item = '';
	let showInvalidMessages = false;

	//Mensagens de erro
	let invalidMessages = {
		nome_item: 'Nome inválido',
		descricao_item: 'Descricao inválida'
	};

	//validando antes de enviar as informações
	let handleSubmit = () => {
		showInvalidMessages = true;
		let valid = true;
		if (nome_item.length < 5) valid = false;
		if (descricao_item.length < 18) valid = false;

		if (valid) {
			const endpoint = 'http://localhost:8000/api/item/';

			let data = new FormData();
			data.append('nome_item', nome_item);
			data.append('descricao_item', descricao_item);

			fetch(endpoint, { method: 'POST', body: data })
				.then((response) => response.json())
				.then((data) => {
					ItemStore.update((prev: any) => [...prev, data]);
				});

			goto('/item/');
		}
	};
</script>

<div>
	<div class="bg-light navbar navbar-expand-lg navbar-light">
		<div class="d-flex align-items-center flex-row">
			<Layout />
		</div>
	</div>
	<h2 class="my-4">Registre um Item</h2>
	{#if showInvalidMessages}
		<h4 class="text-danger">O formulario contem dados invalidos</h4>
	{/if}

	<div class="col-12 col-md-6">
		<form on:submit|preventDefault={handleSubmit}>
			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="nome_item">Nome do Item</Label>
				<Input
					class={'form-control ' +
						(showInvalidMessages && nome_item.length < 5 ? 'is-invalid' : '')}
					type="text"
					placeholder="nome_item"
					bind:value={nome_item}
				/>
				{#if showInvalidMessages && nome_item.length < 5}
					<p class="text-danger">{invalidMessages.nome_item}</p>
				{/if}
			</div>

			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Label for="descricao_item">Descrição</Label>
				<div class="teste">
					<Textarea
						class={'form-control ' +
							(showInvalidMessages && descricao_item.length < 18 ? 'is-invalid' : '')}
						placeholder="Digite a descrição do item"
						bind:value={descricao_item}
						rows={10}
					/>
					{#if showInvalidMessages && descricao_item.length < 18}
						<p class="text-danger">{invalidMessages.descricao_item}</p>
					{/if}
				</div>
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
	.teste {
		display: flex;
		flex-direction: column;
	}
</style>
