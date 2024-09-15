// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ProfileModel _$ProfileModelFromJson(Map<String, dynamic> json) => ProfileModel(
      id: json['_id'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
      phone: json['phone'] as String,
      role: (json['role'] as List<dynamic>).map((e) => e as String).toList(),
      profilePhoto: json['profile_photo'] as String,
      vehicle: json['vehicle'] as Map<String, dynamic>?,
      savedLocations: (json['saved_locations'] as List<dynamic>)
          .map((e) => e as Map<String, dynamic>?)
          .toList(),
      createdAt: json['createdAt'] as String,
      updatedAt: json['updatedAt'] as String,
      token: json['token'] as String,
    );

Map<String, dynamic> _$ProfileModelToJson(ProfileModel instance) =>
    <String, dynamic>{
      '_id': instance.id,
      'name': instance.name,
      'email': instance.email,
      'phone': instance.phone,
      'role': instance.role,
      'profile_photo': instance.profilePhoto,
      'vehicle': instance.vehicle,
      'saved_locations': instance.savedLocations,
      'createdAt': instance.createdAt,
      'updatedAt': instance.updatedAt,
      'token': instance.token,
    };
