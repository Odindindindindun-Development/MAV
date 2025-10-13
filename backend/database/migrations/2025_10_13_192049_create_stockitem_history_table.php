<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('StockItem_History', function (Blueprint $table) {
            $table->id('HistoryID'); // Primary Key
            $table->unsignedBigInteger('StockItemID'); // Foreign Key
            $table->string('FieldChanged', 100);
            $table->string('OldValue', 255)->nullable();
            $table->string('NewValue', 255)->nullable();
            $table->dateTime('EditedAt')->useCurrent(); // Auto date/time when recorded

            // Foreign key reference to StockItem
            $table->foreign('StockItemID')
                ->references('StockItemID')
                ->on('StockItem')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('StockItem_History');
    }
};
