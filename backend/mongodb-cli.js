#!/usr/bin/env node

const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/heyama-dev';

async function connectAndShow() {
  try {
    console.log('🔗 Connecting to MongoDB:', mongoUri);

    await mongoose.connect(mongoUri);

    console.log('✅ Connected successfully!\n');

    // Get database stats
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('📊 Database: heyama-dev');
    console.log('📋 Collections:');

    for (const collection of collections) {
      const col = db.collection(collection.name);
      const count = await col.countDocuments();
      console.log(`  - ${collection.name} (${count} documents)`);
    }

    // Show users if exists
    if (collections.some(c => c.name === 'users')) {
      console.log('\n👥 Users:');
      const users = await db.collection('users').find({}).toArray();
      users.forEach(user => {
        console.log(`  - ${user.email} (ID: ${user._id})`);
      });
    }

    console.log('\n💾 Done! Close with Ctrl+C');

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

connectAndShow();
