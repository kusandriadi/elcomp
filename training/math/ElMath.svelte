<!-- Di bagian paling akhir file ElMath.svelte, sebelum </script> closing tag -->
<style>
    /* Temporary fix - akan dihapus setelah global styles bekerja */
    :global(.card) {
        background-color: white;
        padding: 1.5rem;
        border-radius: 1.5rem;
        box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
        transition: all 0.3s ease;
        width: 100%;
        max-width: 32rem;
    }

    :global(.btn-primary) {
        background-color: #3b82f6;
        color: white;
        font-weight: 600;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
    }

    :global(.btn-primary:hover) {
        background-color: #2563eb;
        transform: translateY(-2px);
    }

    :global(.form-select) {
        appearance: none;
        background-color: white;
        border: 1px solid #d1d5db;
        color: #374151;
        padding: 0.75rem 1rem;
        padding-right: 2rem;
        border-radius: 0.75rem;
        width: 100%;
    }

    :global(.input-field) {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1.5rem;
        text-align: center;
        border: 2px solid #d1d5db;
        border-radius: 0.75rem;
    }

    :global(.question-display) {
        font-size: 2.5rem;
        font-weight: bold;
        color: #1f2937;
        margin-bottom: 1.5rem;
    }

    @media (min-width: 768px) {
        :global(.question-display) {
            font-size: 4rem;
        }
        :global(.card) {
            padding: 2rem;
            max-width: 32rem;
        }
    }
</style>