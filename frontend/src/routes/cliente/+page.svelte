<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ClienteStore } from './cliente.js';
	import Check from 'svelte-radix/Check.svelte';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import Layout from './+layout.svelte';
	import '../../app.pcss';

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

	let open = false;
	let cnpjs: string[] = [];
	let selectedClient = '';
	let selectedValue = '';

	function closeAndFocusTrigger(Id: string) {
		open = false;
		tick().then(() => {
			document.getElementById(Id)?.focus();
		});
	}

	onMount(async function () {
		const { subscribe } = ClienteStore;
		const unsubscribe = subscribe((value: Cliente[]) => {
			if (value && value.length === 0) {
				fetchData();
			}
		});
		return unsubscribe;
	});

	onDestroy(() => {
		const { set } = ClienteStore;
		set([]); 
	});

	async function fetchData() {
		const endpoint = 'http://localhost:8000/api/cliente/';
		const response = await fetch(endpoint);
		const data = await response.json();
		ClienteStore.set(data);
		cnpjs = data.map((cliente: Cliente) => cliente.cnpj);
	}

	let handleDelete = (id: string) => {
		const endpoint = `http://localhost:8000/api/cliente/${id}`;
		fetch(endpoint, { method: 'DELETE' }).then((response) => {
			if (response.status == 204) {
				ClienteStore.update((prev: Cliente[]) => prev.filter((cliente) => cliente.id != id));
			}
		});
	};

	function handleSelectChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedClient = target.value;
	}

	$: filteredCliente = $ClienteStore.filter((cliente: Cliente) => {
		return selectedClient === '' || cliente.cnpj.includes(selectedClient);
	});

	$: selectedValue = selectedClient || 'Selecione o CNPJ...';
</script>

<div class="bg-light navbar navbar-expand-lg navbar-light">
	<div class="d-flex align-items-center flex-row">
		<Layout />
	</div>
</div>
<div class="my-4">
	<h2>Lista de Clientes</h2>
	<div class="teste">
		<Popover.Root bind:open let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					class="w-[200px] justify-between"
				>
					{selectedValue}
					<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Input
						placeholder="Procure o Cnpj"
						class="h-9"
						bind:value={selectedClient}
						on:change={handleSelectChange}
					/>
					<Command.Empty>Nenhum CNPJ Encontrado</Command.Empty>
					<Command.Group>
						{#each cnpjs as cnpjItem}
							<Command.Item
								value={cnpjItem}
								onSelect={(currentValue) => {
									selectedClient = currentValue;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<Check
									class={cn('mr-2 h-4 w-4', selectedClient !== cnpjItem && 'text-transparent')}
								/>
								{cnpjItem}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</div>
	<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
		{#each filteredCliente as cliente}
			<div class="col">
				<div class="card">
					<img
						class="card-img-top"
						src={cliente.image}
						alt="Cliente"
						style="height: 300px; object-fit: cover;"
					/>
					<div class="card-body">
						<h5 class="card-title">{cliente.razao_social}</h5>
						<p class="card-text">CNPJ: {cliente.cnpj}</p>
						<a href="/cliente/{cliente.id}" class="btn btn-primary">Ver Detalhes</a>
						<Button
							on:click={() => handleDelete(cliente.id)}
							class="btn btn-danger ms-2"
							variant="destructive">Deletar</Button
						>
					</div>
				</div>
			</div>
		{/each}
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
	.row {
		margin-top: 5px;
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
