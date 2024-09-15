import 'package:flutter/material.dart';
import 'package:rideok/provider/auth_provider.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    final profile = context.watch<AuthProvider>().profileModel;

    return Center(
      child: Text("${profile?.email}"),
    );
  }
}
