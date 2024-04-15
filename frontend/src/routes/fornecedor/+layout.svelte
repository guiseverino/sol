<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
</script>

<div class="container">
	<slot>
		<nav class="navbar navbar-expand-lg">
			<a class="navbar-brand me-auto" href="/cliente">SOL</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<ul class="navbar-nav">
				<li class="nav-item">
					<a href="/cliente" class={buttonVariants({ variant: 'outline' })}>Cliente</a>
				</li>
				<li class="nav-item">
					<a href="/cliente/add" class={buttonVariants({ variant: 'outline' })}>Add Cliente</a>
				</li>
				<li class="nav-item">
					<a href="/fornecedor/" class={buttonVariants({ variant: 'outline' })}>Fornecedor</a>
				</li>
				<li class="nav-item">
					<a href="/fornecedor/add" class={buttonVariants({ variant: 'outline' })}>Add Fornecedor</a>
				</li>
				<li class="nav-item">
					<a href="/item/" class={buttonVariants({ variant: 'outline' })}>Item</a>
				</li>
				<li class="nav-item">
					<a href="/item/add" class={buttonVariants({ variant: 'outline' })}>Add Item</a>
				</li>
			</ul>
		</nav>
	</slot>
</div>

<style>
	.navbar-nav {
		padding-left: 40px;
	}
	.nav-item {
		padding-left: 8px;
	}
</style>
