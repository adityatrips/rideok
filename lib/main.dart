import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:rideok/pages/home_page.dart';
import 'package:rideok/provider/auth_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => AuthProvider()),
      ],
      child: MaterialApp(
        title: 'RideOK',
        theme: ThemeData(
          brightness: Brightness.dark,
        ),
        home: Scaffold(
          appBar: AppBar(
            title: const Text('RideOK'),
          ),
          body: const HomePage(),
        ),
      ),
    );
  }
}
