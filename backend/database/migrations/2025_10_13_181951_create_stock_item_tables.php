<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('StockItem', function (Blueprint $table) {
            $table->id('StockItemID');
            $table->string('ItemName');
            $table->string('Description')->nullable();
            $table->integer('QuantityOnHand')->default(0);
            $table->decimal('UnitPrice', 10, 2);
            $table->string('Supplier')->nullable();
            $table->integer('ReorderLevel')->default(15);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('StockItem');
    }
};
