<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { FornecedorStore } from './fornecedor.js';
	import Check from 'svelte-radix/Check.svelte';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import Layout from './+layout.svelte';
	import '../../app.pcss';

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
	let open = false;
	let cnpjs: string[] = [];
	let selectedFornecedor = '';
	let selectedValue = '';

	function closeAndFocusTrigger(Id: string) {
		open = false;
		tick().then(() => {
			document.getElementById(Id)?.focus();
		});
	}

	onMount(async function () {
		const { subscribe } = FornecedorStore;
		const unsubscribe = subscribe((value: Fornecedor[]) => {
			if (value && value.length === 0) {
				fetchData();
			}
		});
		return unsubscribe;
	});

	async function fetchData() {
		const endpoint = `http://localhost:8000/api/fornecedor/`;
		const response = await fetch(endpoint);
		const data = await response.json();
		FornecedorStore.set(data);
		cnpjs = data.map((fornecedor: Fornecedor) => fornecedor.cnpj);
	}
	onDestroy(() => {
		const { set } = FornecedorStore;
		set([]);
	});
	let handleDelete = (id: string) => {
		const endpoint = `http://localhost:8000/api/fornecedor/${id}`;
		fetch(endpoint, { method: 'DELETE' }).then((response) => {
			if (response.status == 204) {
				FornecedorStore.update((prev: Fornecedor[]) =>
					prev.filter((fornecedor) => fornecedor.id != id)
				);
			}
		});
	};

	function handleSelectChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedFornecedor = target.value;
	}

	$: filteredFornecedor = $FornecedorStore.filter((fornecedor: Fornecedor) => {
		return selectedFornecedor === '' || fornecedor.cnpj.includes(selectedFornecedor);
	});

	$: selectedValue = selectedFornecedor || 'Selecione o CNPJ...';
</script>

<div class="bg-light navbar navbar-expand-lg navbar-light">
	<div class="d-flex align-items-center flex-row">
		<Layout />
	</div>
</div>

<div class="container">
	<div class="my-4">
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
							bind:value={selectedFornecedor}
							on:change={handleSelectChange}
						/>
						<Command.Empty>Nenhum CNPJ Encontrado</Command.Empty>
						<Command.Group>
							{#each cnpjs as cnpjItem}
								<Command.Item
									value={cnpjItem}
									onSelect={(currentValue) => {
										selectedFornecedor = currentValue;
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									<Check
										class={cn(
											'mr-2 h-4 w-4',
											selectedFornecedor !== cnpjItem && 'text-transparent'
										)}
									/>
									{cnpjItem}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>
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
				{#each filteredFornecedor as fornecedor}
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
						<td>({fornecedor.ddd})-{fornecedor.telefone}</td>
						<td>
							<div class="button-group">
								<Button href="/fornecedor/{fornecedor.id}" class="btn btn-primary">Ver Detalhes</Button>
								<Button
									on:click={() => handleDelete(fornecedor.id)}
									class="btn btn-danger ms-2"
									variant="destructive">Deletar</Button
								>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
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
	.container {
		padding-top: 100px;
	}
	.teste {
		padding-bottom: 40px;
	}
	.button-group {
		display: flex;
		gap: 8px;
	}
</style>
