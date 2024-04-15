<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ItemStore } from './item.js';
	import Check from 'svelte-radix/Check.svelte';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import Layout from './+layout.svelte';
	import '../../app.pcss';

	interface Item {
		id: string;
		nome_item: string;
		descricao_item: string;
	}
	let open = false;
	let nomes: string[] = [];
	let selectedItem = '';
	let selectedValue = '';

	function closeAndFocusTrigger(Id: string) {
		open = false;
		tick().then(() => {
			document.getElementById(Id)?.focus();
		});
	}

	onMount(async function () {
		const { subscribe } = ItemStore;
		const unsubscribe = subscribe((value: Item[]) => {
			if (value && value.length === 0) {
				fetchData();
			}
		});
		return unsubscribe;
	});

	async function fetchData() {
		const endpoint = `http://localhost:8000/api/item/`;
		const response = await fetch(endpoint);
		const data = await response.json();
		ItemStore.set(data);
		nomes = data.map((item: Item) => item.nome_item);
	}
	onDestroy(() => {
		const { set } = ItemStore;
		set([]);
	});
	let handleDelete = (id: string) => {
		const endpoint = `http://localhost:8000/api/item/${id}`;
		fetch(endpoint, { method: 'DELETE' }).then((response) => {
			if (response.status == 204) {
				ItemStore.update((prev: Item[]) => prev.filter((item) => item.id != id));
			}
		});
	};

	function handleSelectChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedItem = target.value;
	}

	$: filteredItem = $ItemStore.filter((item: Item) => {
		return selectedItem === '' || item.nome_item.includes(selectedItem);
	});

	$: selectedValue = selectedItem || 'Selecione o Item...';
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
							bind:value={selectedItem}
							on:change={handleSelectChange}
						/>
						<Command.Empty>Nenhum Item Encontrado</Command.Empty>
						<Command.Group>
							{#each nomes as nome}
								<Command.Item
									value={nome}
									onSelect={(currentValue) => {
										selectedItem = currentValue;
										closeAndFocusTrigger(ids.trigger);
									}}
								>
									<Check class={cn('mr-2 h-4 w-4', selectedItem !== nome && 'text-transparent')} />
									{nome}
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
					<th scope="col">NOME</th>
					<th scope="col">DESCRICAO</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredItem as item}
					<tr>
						<th scope="row">{item.id}</th>
						<td>{item.nome_item}</td>
						<td>{item.descricao_item}</td>
						<td>
							<Button href="/item/{item.id}" class="btn btn-primary">Ver Detalhes</Button>

							<Button
								on:click={() => handleDelete(item.id)}
								class="btn btn-danger ms-2"
								variant="destructive">Deletar</Button
							>
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
</style>
